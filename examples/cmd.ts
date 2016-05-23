import {spawn} from "child_process";
import {ChildProcess} from "child_process";

class ProcessHandle {

  private process: ChildProcess;

  public output: string;
  public error: string;
  public exitCode: number;
  public timedOut: boolean;

  public onOutput: (data: Buffer) => void;
  public onError: (data: Buffer) => void;

  constructor() {
    this.output = "";
    this.error = "";
    this.exitCode = -1;
    this.timedOut = false;
  }

  get pid() {
    return this.process ? this.process.pid : null;
  }

  public execute(cmd: string, args?: string[], timeout?: number) {
    return Promise.all([
      this.handleProcess(cmd, args, timeout),
      this.handleOutput(),
      this.handleError()
    ]).then(() => {});
  }

  public kill(signal?: string) {
    if(this.process) {
      this.process.kill(signal);
    }
  }

  private handleOutput() {
    return new Promise((resolve) => {

      this.process.stdout.on("data", (data: Buffer) => {
        this.output += data.toString();

        if(this.onOutput)
          this.onOutput(data);
      });

      this.process.stdout.on("end", () => {
        resolve();
      });

    });
  }

  private handleError() {
    return new Promise((resolve) => {

      this.process.stderr.on("data", (data: Buffer) => {
        this.error += data.toString();

        if(this.onError)
          this.onError(data);
      });

      this.process.stderr.on("end", () => {
        resolve();
      });

    });
  }

  private handleProcess(cmd: string, args?: string[], timeout?: number) {
    return new Promise((resolve) => {
      this.process = spawn(cmd, args);

      if(timeout) {
        setInterval(() => {
          this.timedOut = true;
          this.kill();
        }, timeout);
      }

      this.process.on("exit", (code: number) => {
        this.exitCode = code;
        resolve();
      });

    });

  }
}

class SayCommand {
  constructor(voice) {

  }
}

console.log(process.platform);

var proc = new ProcessHandle();

proc.execute("say", ["hi"])
  .then(() => {
    console.log("O: " + proc.output);
    console.log("E: " + proc.error);
    console.log("C: " + proc.exitCode);
    console.log("T: " + proc.timedOut);
  });
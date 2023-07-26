export class ServerError extends Error {
  code: number;

  constructor(errorName: string, message: string, code: number) {
    super(errorName);
    this.message = message;
    this.code = code;
  }
}
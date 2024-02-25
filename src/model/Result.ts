export default class Result<T> {
  data: T;
  error: Error;
  status: number;
  message: string;
  constructor(data: T = null, error: Error = null, status: number = 200, message: string = "") {
    this.data = data;
    this.error = error;
    this.message = message;
    this.status = status;
  }
}
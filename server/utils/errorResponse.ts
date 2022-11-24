import { Error } from 'mongoose';

export class ErrorResponse extends Error {
  statusCode: number | string;
  constructor (msg: string, statusCode: number | string) {
    super(msg);
    // restore prototype chain
    Object.setPrototypeOf(this, ErrorResponse.prototype); // restore prototype chain
    this.statusCode = statusCode;
  }
}

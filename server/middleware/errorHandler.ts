import type { ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../utils/errorResponse';
const chalk = require('chalk');
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;

  /* Display more info on Error Object */
  console.log(chalk.red(err.stack));
  /* Mongoose Bad Object Id */
  if (err.name === 'CastError') {
    const message = `Cast Error: Note Folder not found with id of: ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = 'Duplicate field value.';
    error = new ErrorResponse(message, 400);
  }

  //Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message: string[] = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message.toString(), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};


module.exports = errorHandler;

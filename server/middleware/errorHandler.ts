import type { ErrorRequestHandler } from 'express';

import { ErrorResponse } from '../utils/errorResponse';
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let error = { ...err };
  error.message = err.message;

  console.log(err);
  /* Mongoose Bad Object Id */
  if (err.name === 'CastError') {
    const message = `Note Folder not found with id of: ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};


module.exports = errorHandler;

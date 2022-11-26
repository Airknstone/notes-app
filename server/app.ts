import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import http from 'http';

import bodyParser from 'body-parser';
const swaggerUiExpress = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const chalk = require('chalk');
const morgan = require('morgan');
const NotesApi = require('./routes/notes_api');
const errorHandler = require('./middleware/errorHandler');

class Server {
  public app: express.Application;
  static bootstrap(): Server {
    return new Server();
  }

  constructor () {
    this.app = express();
    // configure application
    this.config();
  }

  config() {
    // Parsers for POST data
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Point static path to dist
    this.app.use(express.static(path.join(__dirname, '../dist/notes-app')));
    this.app.use(
      '/',
      express.static(path.join(__dirname, '../dist/notes-app')),
    );

    this.app.use(morgan('dev'));

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Notes App',
          version: '1.0.0',
        },
      },
      apis: [ `${__dirname}/routes/*.ts` ],
    };

    const CONN: string = 'mongodb://127.0.0.1:27017/Notes_app';

    mongoose
      .connect(CONN)
      .then(() => {
        console.log(
          chalk.bgCyan('Connection to database was successful'),
        );
      })
      .catch((err) => {
        console.log(chalk.red(`MongoDB Error: ${err}`));
      });

    const openapiSpecifications = swaggerJsdoc(options);

    this.app.use(
      '/api-docs',
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(openapiSpecifications),
    );
    this.app.use('/api/notes', NotesApi);
    this.app.use(errorHandler);


    /**
     * Get port from environment and store in Express.
     */
    const port = process.env[ 'PORT' ] || '3000';
    this.app.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(this.app);


    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, () =>
      console.log(
        chalk.bgGreenBright(`App started and listening on localhost: ${port}`),
      ),
    );
  }
}

Server.bootstrap();

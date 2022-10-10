import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import chalk from 'chalk';

class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor () {
    this.app = express();
    // configure application
    this.config();
  }

  private config() {
    // Parsers for POST data
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // Point static path to dist
    this.app.use(express.static(path.join(__dirname, 'public')));


    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: "Notes App",
          version: '1.0.0',
        },
      },
      apis: [ `${__dirname}/routes/*.js` ],
    };

    const CONN = 'mongodb://127.0.0.1:27017/Notes_app';

    mongoose.connect(CONN).then(() => {
      console.log(chalk.bgGreenBright('Connection to database was successful'));
    }).catch(err => {
      console.log(chalk.red(`MongoDB Error: ${err}`));
    });


    const openapiSpecifications = swaggerJsdoc(options);

    this.app.use(
      '/api-docs',
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(openapiSpecifications),
    );

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
    server.listen(port, () => console.log(chalk.bgGreenBright(`App started and listening on localhost: ${port}`)));
  }
}

Server.bootstrap();

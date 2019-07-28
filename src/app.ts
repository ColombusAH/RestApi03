/*
 *  Rewritten in typescript for learning experience , please be cool.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import routes from './routes';
import { ErrorMiddleware } from './middlewares/errorMiddleware';

class App {
  public _app: express.Application;
  public _port: number;

  constructor(port: number) {
    this._app = express();
    this._port = port;
    this._app.set('port', port);
    this.initializeBaseMiddleware();
    this.initializeLoggerMiddleware();
    this.addRoutes();
    this.addErrorMiddlewares();
    this.addStaticFiles();
  }

  private initializeBaseMiddleware() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  private initializeLoggerMiddleware() {
    //set the log file.
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, './logs/access.log'),
      { flags: 'a' }
    );
    //register morgan to be my logger.
    this._app.use(morgan('combined', { stream: accessLogStream }));
  }

  private addRoutes() {
    //register routes
    this._app.use(routes);
  }
  private addErrorMiddlewares() {
    //register error middleware
    this._app.use(ErrorMiddleware);
  }

  private addStaticFiles() {
    this._app.use('/static', express.static(path.join(__dirname, 'data')));
  }
  public listen() {
    this._app.listen(this._port, () => {
      console.log(`Server is listennig on http://localhost:${this._port}/`);
    });
  }
}
export default App;

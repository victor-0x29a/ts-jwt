import express from 'express';
import Rotas from './routes';
import Middlewares from './middlewares';

class Server {
  app: express.Application;
  constructor() {
    this.app = express();
    this.Load();
  }
  private Load(): void {
    Middlewares(this.app);
    this.app.use('/api', Rotas);
  }
}

export default new Server().app;

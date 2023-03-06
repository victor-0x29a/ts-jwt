import express from 'express';
import auth from './auth';
import member from './member';
import JSONWEBTOKEN from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

class Rotas {
  app: express.Router;
  private async blockRoute(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    let [token, secret] = [req.headers['authorization'], process.env.SECRET];
    if (token === undefined || secret === undefined) {
      return res.status(401).json();
    }
    JSONWEBTOKEN.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json();
      }
      next();
    });
  }
  constructor() {
    this.app = express.Router();
    this.Routes();
  }
  private Routes(): void {
    console.log('EndPoint loaded.');
    this.app.use('/auth', auth);
    this.app.use('/member', this.blockRoute, member);
  }
}

export default new Rotas().app;

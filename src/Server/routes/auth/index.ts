import express, { Request, Response } from 'express';
import newAccountSchema from '../../../schemas/newAccount';
import AccountSchema from '../../../schemas/AccountSchema';
import bcrypt from 'bcrypt';
import UserModel from '../../../models/user';
import Token from '../../../webtoken';

class Auth {
  app: express.Router;
  constructor() {
    this.app = express.Router();
    this.Routes();
  }
  private Routes(): void {
    this.app.post('/register', async (req: Request, res: Response) => {
      try {
        let entry = newAccountSchema.safeParse(req.body);
        if (!entry.success) {
          return res.status(406).json({ Message: 'Confira os dados enviados' });
        } else {
          if (entry.data.pass !== entry.data.passConfirm) {
            return res.status(406).json({ Message: 'As senhas nao batem' });
          }
          let user = await UserModel.findOne({
            where: { name: entry.data.name },
          });
          if (user !== null) {
            return res
              .status(404)
              .json({ Message: 'Tente novamente com outro nome...' });
          }
          let salt: number = Math.floor(Math.random() * 9);
          bcrypt.hash(entry.data.pass, salt, async (err, hash) => {
            if (err) {
              return res
                .status(500)
                .json({ Message: 'Houve um erro interno...' });
            }
            await UserModel.create({
              name: req.body.name,
              pass: hash,
              salt: salt,
            })
              .then(() => {
                return res
                  .status(200)
                  .json({ user: req.body.name, status: true });
              })
              .catch(err => {
                return res.status(500).json({
                  user: req.body.name,
                  status: false,
                  Message: 'Erro interno, tente novamente mais tarde',
                });
              });
          });
        }
      } catch (e) {
        return res.status(400).json();
      }
    });
    this.app.post('/login', async (req: Request, res: Response) => {
      try {
        let entry = AccountSchema.safeParse(req.body);
        if (!entry.success) {
          return res.status(406).json({ Message: 'Confira os dados enviados' });
        }
        let user = await UserModel.findOne({
          where: { name: entry.data.name },
        });
        if (user === null) {
          return res
            .status(404)
            .json({ Message: 'Confira os dados fornecidos...' });
        }
        bcrypt.compare(entry.data.pass, user.pass, async (err, result) => {
          if (err) {
            return res.status(500).json({ Message: 'Houve um erro interno' });
          }
          if (!result) {
            return res.status(401).json({ Message: 'Confira as credenciais!' });
          }
          let jwt = Token.generateToken(req.body.name);
          if (jwt) {
            return res.status(200).json({ JWT: jwt });
          } else {
            return res
              .status(500)
              .json('Houve um erro, tente novamente mais tarde...');
          }
        });
      } catch (e) {
        return res.status(400).json();
      }
    });
  }
}

export default new Auth().app;

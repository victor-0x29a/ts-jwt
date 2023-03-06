import * as express from 'express';
import UserModel from '../../../models/user';
interface MemberSerialized {
  Name: string;
  Pass: string;
}

class Member {
  app: express.Router;
  constructor(App: express.Router) {
    this.app = App;
    this.Routes();
  }
  private Routes(): void {
    this.app.get('/', async (req: express.Request, res: express.Response) => {
      try {
        let members: Array<UserModel> = await UserModel.findAll();
        let serializeList: Array<MemberSerialized> = [];
        for (let i: number = 0; i < members.length; i++) {
          serializeList.push({
            Name: members[i].name,
            Pass: members[i].pass,
          });
        }
        return res.status(200).json({ Users: serializeList });
      } catch (e) {
        return res.status(400).json();
      }
    });
  }
}

export default new Member(express.Router()).app;

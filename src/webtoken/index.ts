import JSONWEBTOKEN from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
class Token {
  secret: string | undefined;
  constructor(secret: string | undefined) {
    this.secret = secret;
  }
  public generateToken(name: string): String | Boolean {
    if (!this.secret || this.secret === undefined) {
      return false;
    }
    let jwt = JSONWEBTOKEN.sign({ Name: name }, this.secret);
    return jwt;
  }
}

export default new Token(process.env.SECRET);

import Server from './Server/index';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

Server.listen(process.env.PORT, () => {
  console.log('Api rodando ' + process.env.PORT);
});

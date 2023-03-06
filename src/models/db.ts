import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(
  `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
);

sequelize
  .authenticate()
  .then((err): void => {
    console.log('Connection Ok');
  })
  .catch((err): void => {
    console.log('Connection Failed');
  });

export default sequelize;

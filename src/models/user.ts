import sequelize, {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from './db';

type User = {
  id: number;
  name: string;
  pass: string;
};
interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id?: number;
  name: string;
  pass: string;
  salt: number;
}
const UserModel = db.define<UserModel>('user', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//UserModel.sync({ force: true });

export default UserModel;

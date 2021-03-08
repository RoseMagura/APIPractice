import { DataTypes, Model, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(String(process.env.LOCAL_CONNECTION), {
    define: {
        timestamps: false,
    },
});
class User extends Model {}

User.init(
    {
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        underscored: true,
        sequelize,
        modelName: 'User',
    }
);

export default User;

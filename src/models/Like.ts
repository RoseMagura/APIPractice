import { DataTypes, Model, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(String(process.env.LOCAL_CONNECTION), {
    define: {
        timestamps: false,
    },
});
class Like extends Model {}

Like.init(
    {},
    {
        underscored: true,
        sequelize,
        modelName: 'Like',
    }
);

export default Like;

import { DataTypes, Model, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(String(process.env.LOCAL_CONNECTION), {
    define: {
        timestamps: false,
    },
});
class Comment extends Model {}

Comment.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
        sequelize,
        modelName: 'Comment',
    }
);

export default Comment;
import { DataTypes, Model, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(String(process.env.LOCAL_CONNECTION), {
    define: {
        timestamps: false,
    },
});
class Image extends Model {}

Image.init(
    {
        title: { type: DataTypes.STRING, allowNull: false },
        url: { type: DataTypes.STRING, allowNull: false },
    },
    {
        underscored: true,
        sequelize,
        modelName: 'Image',
    }
);

export default Image;
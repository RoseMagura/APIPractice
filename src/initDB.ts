import * as pg from 'pg';
import * as dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(String(process.env.LOCAL_CONNECTION), {
    define: {
        timestamps: false,
    },
});

export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const { Pool } = pg;

// const connectionString = process.env.CONNECTION_STRING;
const connectionString = process.env.LOCAL_CONNECTION;

const pool = new Pool({
    connectionString,
});

export const query = (statement: string): any => {
    try {
        const result = pool.query(statement);
        return result;
    } catch (error: unknown) {
        console.log(error);
    }
};

const addImages = async(): Promise<void> => {
    const images = [
        [
            'Smoothie',
            'https://www.usmagazine.com/wp-content/uploads/2018/06/Smoothie-the-Cat-Instagram-zoom.jpg?quality=86&strip=all',
        ],
        [
            'Together',
            'https://i.pinimg.com/originals/7d/b7/e7/7db7e7414842d89ca7741009b10cc376.jpg',
        ],
        [
            'Close Up',
            'https://welovecatsandkittens.com/wp-content/uploads/2017/09/smoothie.jpg',
        ],
        ['Loaves', 'https://i.redd.it/z9hb84g2yxvz.jpg'],
        ['Bingus', 'https://pbs.twimg.com/media/EoXHx4cUwAAf8Wx.jpg'],
    ];

    const currImages = await query('SELECT * FROM IMAGES');
    if (currImages.rowCount === 0) {
        console.log('Setting up DB');
        images.forEach(async (item) => {
            try {
                await query(
                    `INSERT INTO IMAGES (title, url) VALUES('${item[0]}', '${item[1]}');`
                );
            } catch (error) {
                console.error(error);
            }
        });
    }
}
const createTables = async (): Promise<void> => {
    const Image = sequelize.define(
        'Image',
        {
            title: { type: DataTypes.STRING, allowNull: false },
            url: { type: DataTypes.STRING, allowNull: false },
        },
        { underscored: true }
    );
    const User = sequelize.define(
        'User',
        {
            username: { type: DataTypes.STRING, allowNull: false },
            passord: { type: DataTypes.STRING, allowNull: false },
            first_name: { type: DataTypes.STRING, allowNull: false },
            last_name: { type: DataTypes.STRING, allowNull: false },
            admin: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            underscored: true,
        }
    );
    const Comment = sequelize.define(
        'Comment',
        {
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
        }
    );
    const Like = sequelize.define('Like', {}, { tableName: 'likes' });
    User.hasMany(Comment, { foreignKey: { name: 'user_id' } });
    User.hasMany(Like, { foreignKey: { name: 'user_id' } });

    User.hasMany(Image, { foreignKey: { name: 'user_id' } });
    Image.hasMany(Comment, { foreignKey: { name: 'image_id' } });
    Image.hasMany(Like, { foreignKey: { name: 'image_id' } });
    /* Create tables if they don't already exist, but don't
    force the database drop and create existing tables */
    await sequelize.sync();

};

const createAdmin = async (): Promise<void> => {

}
export const setUp = async (): Promise<void> => {
    await createTables();
    await addImages();
    // await createAdmin();
};

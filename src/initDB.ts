import * as pg from 'pg';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

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

const addImages = async (userId: number): Promise<void> => {
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
                    `INSERT INTO IMAGES (title, url, user_id) VALUES('${item[0]}', '${item[1]}', ${userId});`
                );
            } catch (error) {
                console.error(error);
            }
        });
    }
};


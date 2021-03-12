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

export const Image = sequelize.define(
    'Image',
    {
        title: { type: DataTypes.STRING, allowNull: false },
        url: { type: DataTypes.STRING, allowNull: false },
    }
);

export const User = sequelize.define(
    'User',
    {
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    }
);
export const Comment = sequelize.define(
    'Comment',
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);
export const Like = sequelize.define('Like', {}, {});

export const createRelationships = async () => {
    User.hasMany(Comment, { foreignKey: { name: 'userId' } });
    User.hasMany(Like, { foreignKey: { name: 'userId' } });

    User.hasMany(Image, { foreignKey: { name: 'userId' } });
    Image.hasMany(Comment, { foreignKey: { name: 'imageId' } });
    Image.hasMany(Like, { foreignKey: { name: 'imageId' } });
    /* Create tables if they don't already exist, but don't
    force the database drop and create existing tables */
    await sequelize.sync();
};

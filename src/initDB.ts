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



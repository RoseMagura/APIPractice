// import * as Image from '../models/image';
const db = require('./models/index.js');
const { Sequelize } = require('sequelize');

require('dotenv').config({ path: '../.env'});

const sequelize = new Sequelize(process.env.LOCAL_CONNECTION, {
    define: {
        timestamps: false,
    },
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// export
const checkImage = async () => {
    // testConnection();
    console.log(await db.image.findAll());
    
    // const users = await User.findAll();
    // console.log(users);
}

checkImage();
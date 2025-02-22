import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import chalk from 'chalk';

dotenv.config({
    path: './db.env'
});

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

//anytime i want to talk to db
const sequelize = new Sequelize(
    DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    //logs all sql queries 
    logging: query => console.log(chalk.blue(`SQL Query: ${query}`))
    //logging: false
});

try {
    // makes the connection to db - passes creds to db - acc or deny. Just comm to db
    await sequelize.authenticate();
    console.log('Connected successfully.');
} catch (error) {
    console.error('Unable to connect:', error);
}

export default sequelize;
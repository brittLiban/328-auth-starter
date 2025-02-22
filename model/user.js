import sequelize from './../db/db.js';
import { DataTypes } from 'sequelize';
import bcrypt, { hash } from 'bcrypt';

const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if(user.password) {
               await  hashPassword(user);
            }
        },
        beforeUpdate: (user) => {}
    }
})

//add a function to hash passwords
async function hashPassword(user){
    const salt = await bcrypt.genSalt(10);

    console.log(`Salt that was generate ${salt}`);
    console.log(`The password b4 salt - ${user.password}`);
    user.password = await bcrypt.hash(user.password, salt);
    console.log(`Encrypted password ${user.password}`);
}
//add a function to validate passwords
User.validatePassword = async (plainPass, hashPassword) => {
    return await bcrypt.compare(plainPass, hashPassword);
}
//make sure table is created
await User.sync({ alter: true });

export default User;
import sequelize from "../db/db.js";
import User from '../model/user.js';

await User.create({
    username : 'Veh',
    password : 'Blue123'
})

console.log(`It worked`);
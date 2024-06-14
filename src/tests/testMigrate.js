
const app = require('../app');
const sequelize = require('../utils/connection');
const request = require('supertest');


const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const testUser = {
            firstName: "Felipe",
         lastName: "mamani",
        email: "felipe@gmail.com",
        gender: "male",
        }

        await request(app).post('/users').send(testUser);
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
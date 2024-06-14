const app = require("../app");

let id;
let token;

// 1 POST
// 2 POST USER/LOGIN
// RESTO DEL TEST
const request = require('supertest');

test('POST/ users debe crear un usuario', async()=>{
    const newUser = {
        firstName: 'test user',
        lastName: 'test user',
        email: 'test11@gmail.com',
        password: 'test1234',
        gender: 'other',
    }
    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST /users/login debe loguear al usuario', async()=>{
    const credentials = {
        email: 'test11@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email);


});


test('GET /users debe traer todos los usuarios', async () => {
    const res = await request(app).get('/users').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

});

test('POST /users/login con credenciales incorrectas deben dar erro', async () =>{
    const credentials = {
        email: 'incorrecto@gmail.com',
        password: 'test1234',
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);

});


test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await request(app).delete(`/users/${id}`).set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});


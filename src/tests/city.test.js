const request = require("supertest");
const app = require("../app");

let id;
let token;

beforeAll( async () =>{
    const credentials = {
        email: "felipe@gmail.com",
        password: "1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /cities debe traer todas las ciudades', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);  
});

test('POST /news debe crear una ciudad', async ()=>{
    const cityBody = {
        name: "Arequipa",
        country: "Peru",
        countryId: "PE"
    }
    const res = await request(app)
    .post('/cities')
    .send(cityBody)
    .set('Authorization', `Bearer ${token}`);

    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(cityBody.name);
    expect(res.body.id).toBeDefined();
});

test('DELETE /cties/:id debe eliminar una ciudad', async () =>{
    const res = await request(app)
    .delete('/cities/'+id)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
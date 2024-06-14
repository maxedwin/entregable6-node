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

test('GET /hotels debe traer todas las ciudades', async () => {
    const res = await request(app).get('/hotels');
    expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);  
});

test('POST /hotels debe crear una hotel', async ()=>{
    const hotelBody = {
            name: "Mirador de Chilina",
            description: "Hotel turistico de Arequipa",
            price: "15.50",
            address: "Av Jesus 458",
            cityId: 2,
            lat: "-16.410589",
            lon: "-71.536033"
    }
    const res = await request(app)
    .post('/hotels')
    .send(hotelBody)
    .set('Authorization', `Bearer ${token}`);

    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(hotelBody.name);
    expect(res.body.id).toBeDefined();
});

test('DELETE /hotels/:id debe eliminar una ciudad', async () =>{
    const res = await request(app)
    .delete('/hotels/'+id)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
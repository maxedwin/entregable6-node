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

test('GET /bookings debe traer todas las reservaciones', async () => {
    const res = await request(app)
        .get('/bookings')
        .set('Authorization', `Bearer ${token}`); // Añadir el token de autorización
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /bookings debe crear una reservacion', async ()=>{
    const bookingBody = {
        checkIn: "2024-06-16",
        checkOut: "2024-06-23",
        hotelId: 1
    }
    const res = await request(app)
    .post('/bookings')
    .send(bookingBody)
    .set('Authorization', `Bearer ${token}`);

    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.checkIn).toBe(bookingBody.checkIn);
    expect(res.body.id).toBeDefined();
});

test('DELETE /bookigs/:id debe eliminar una noticia', async () =>{
    const res = await request(app)
    .delete('/bookings/'+id)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
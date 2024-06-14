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

test('GET /reviews debe traer todas las reviwes', async () => {
    const res = await request(app).get('/reviews');
    expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);  
});

test('POST /reviews debe crear una review', async ()=>{
    const reviewBody = {
        hotelId: 1,
        comment: "buen hotel",
        rating: 4
        
    }
    const res = await request(app)
    .post('/reviews')
    .send(reviewBody)
    .set('Authorization', `Bearer ${token}`);

    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.comment).toBe(reviewBody.comment);
    expect(res.body.id).toBeDefined();
});

test('DELETE /reviews/:id debe eliminar una review', async () =>{
    const res = await request(app)
    .delete('/reviews/'+id)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
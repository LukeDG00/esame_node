const request = require('supertest')
const { app, close } = require('./app')

describe("Test di tutti gli endpoint della mia API", () => {
    it("La GET di / dovrebbe restituire hello World!", async () => {
        const res = await request(app).get("/");
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual( { message: "Hello World!" } );
    })


    afterAll( (done) => {
        close();
        done();
    })
});
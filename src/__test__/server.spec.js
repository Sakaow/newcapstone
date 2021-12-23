const app = require('../server/index');
const supertest = require('supertest');
const request = supertest(app);

describe("Test GET route /connected", () => {
    it("It should return all tasks", function(done){
        request.get('/connected')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(JSON.stringify({
                author: "Sakaowduan",
                title: "travelplan",
                description: "A travelplan app",
                provider: "udacity",
                server: "connected"
            }))
            .expect(200, done);
        
    });
});

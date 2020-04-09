const request = require ('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe ('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest();              
    });

    afterEach(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ONG",
                email: "contato@gmail.com",
                whatsapp: "1234567891",
                city: "Campo Alegre",
                uf: "SC"     
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});
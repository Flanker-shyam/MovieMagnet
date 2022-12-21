let server;
const request = require("supertest");
const { Genre } = require("../../models/genreModel");
const User = require("../../models/UserModel");

describe("Auth-middleware-integrated", () => {

    beforeEach(() => { server = require("../../index"); })
    afterEach(async() => {
        await server.close();
        await Genre.deleteMany({})
    });

    let token;

    const exec = () => {
        return request(server)
            .post("/genre")
            .set("x-user-auth-token", token)
            .send({ name: "genre1"});
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
        server.close();
    });

    it("should return a 401 error if the token is not provided", async()=>{
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it("Should return a 400 if the invalid token is provided", async()=>{
        token = 'aa';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it("Should return a valid genre if the token is valid", async()=>{
        const res = await exec();
        expect(res.status).toBe(200);
    })
});

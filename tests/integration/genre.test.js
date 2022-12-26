let server;
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { Genre } = require("../../models/genreModel");
const User = require("../../models/UserModel");

describe("/genre", () => {

    beforeEach(() => { server = require("../../index"); })
    afterEach(async () => {
        server.close();
        await Genre.deleteMany({});
    });

    describe("GET /", () => {
        it("Should return all the genres from the database", async () => {

            await Genre.collection.insertMany(
                [{ name: "Genre1" },
                { name: "Genre2" }]
            );

            const res = await request(server).get("/genre");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === "Genre1")).toBeTruthy();
            expect(res.body.some(g => g.name === "Genre2")).toBeTruthy();
        });

    });

    describe("Get /:id", () => {
        it("Should return Genre with the given id", async () => {
            const genre = new Genre({ name: "Genre1" });
            await genre.save();

            const result = await request(server).get("/genre/" + genre._id);
            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("name", genre.name);
        })
        it("Should return an 404 error if the given Id is invalid", async () => {

            const result = await request(server).get("/genre/1");
            expect(result.status).toBe(404);
        });

        it("Should return a 404 error if the genre with given object id doesn't exist", async () => {
            const id = mongoose.Types.ObjectId();
            const result = await request(server).get("/genre/" + id);

            expect(result.status).toBe(404);
        });
    });

    describe("POST /", () => {
        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post("/genre")
                .set("x-user-auth-token", token)
                .send({ name: name });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        it("Should return a 401 error if the client is not logged in", async () => {

            token = '';
            const result = await exec();

            expect(result.status).toBe(401);
        });

        it("Should return a 400 error if the genre length contain less than 5 characters", async () => {

            name = 'aaaa';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("Should return a 400 error if the genre length contain more than 50 characters", async () => {

            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it("Should save the genre in the database if the genre is valid", async () => {

            await exec();

            const genre = Genre.find({ name: "genre1" });

            expect(genre).not.toBe(null);
        });

        it("Should return a genre in the response body", async () => {

            const res = await exec();
            expect(res.body.result).toHaveProperty('_id');
            expect(res.body.result).toHaveProperty('name', 'genre1');
        })
    });

    describe("DELETE /:id", () => {
        let token;

        beforeEach(() => {
            token = new User().generateAuthToken();
        });

        it("Should Delete a genre with the given object Id", async () => {
            const genre = new Genre({ name: "Genre1" });
            await genre.save();

            const result = await request(server).delete("/genre/" + genre._id).set("x-user-auth-token", token);
            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("name", genre.name);
        });

        it("Should return a 401 error if the client is not logged in", async () => {

            token = '';
            const genre = new Genre({ name: "Genre1" });
            await genre.save();
            const result = await request(server).delete("/genre/" + genre._id).set("x-user-auth-token", token);

            expect(result.status).toBe(401);
        });

        it("Should return a 404 error if the genre with given object id doesn't exist", async () => {
            const id = mongoose.Types.ObjectId();
            const result = await request(server).delete("/genre/" + id).set("x-user-auth-token", token);

            expect(result.status).toBe(404);
        });
    });

    describe("PUT /:id", () => {
        let token;

        beforeEach(() => {
            token = new User().generateAuthToken();
        });

        it("Should return a genre with the given object Id", async () => {
            const genre = new Genre({ name: "Genre1" });
            await genre.save();

            const result = await request(server).put("/genre/" + genre._id).set("x-user-auth-token", token);
            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("name", genre.name);
        });

        it("Should return a 401 error if the client is not logged in", async () => {

            token = '';
            const genre = new Genre({ name: "Genre1" });
            await genre.save();
            const result = await request(server).put("/genre/" + genre._id).set("x-user-auth-token", token);

            expect(result.status).toBe(401);
        });

        it("Should return a 404 error if the genre with given object id doesn't exist", async () => {
            const id = mongoose.Types.ObjectId();
            const result = await request(server).put("/genre/" + id).set("x-user-auth-token", token);

            expect(result.status).toBe(404);
        })
    })

});

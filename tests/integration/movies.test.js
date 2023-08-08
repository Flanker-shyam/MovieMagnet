
let server;
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const Movies = require("../../models/moviesModel");
const User = require("../../models/UserModel");
const { Genre } = require("../../models/genreModel");

describe("moviesRoute", () => {

    beforeEach(() => { server = require("../../index"); })
    afterEach(async () => {
        server.close();
        await Movies.deleteMany({});
    });

    describe("GET /", () => {
        it("Should return all the movies from the database", async (req, res) => {

            await Movies.collection.insertMany(
                [{
                    title: "Hello1",
                    tags: ["ok"],
                    genre: {
                        _id: "6349645d1e1efd803c218969",
                        name: "love"
                    },
                    numberInStock: 5,
                    dailyRentalrate: 43
                },
                {
                    title: "Hello2",
                    tags: ["ok2"],
                    genre: {
                        _id: "6349645d1e1efd803c218968",
                        name: "fight"
                    },
                    numberInStock: 5,
                    dailyRentalrate: 43
                }]);
            const result = await request(server).get("/moviess");
            expect(result.status).toBe(200);
            expect(result.body.length).toBe(2);
            expect(result.body.some(g => g.title === "Hello1")).toBeTruthy();
            expect(result.body.some(g => g.title === "Hello2")).toBeTruthy();
        });

    });

    describe("POST /", () => {
        let token;
        let title;
        let tags;
        let _id;
        let name;
        let numberInStock;
        let dailyRentalrate;


        const exec = async () => {
            return await request(server)
                .post("/movies")
                .set("x-user-auth-token", token)
                .send({
                    title: title,
                    tags: tags,
                    genre: {
                        _id: _id,
                        name: name
                    },
                    numberInStock: numberInStock,
                    dailyRentalrate: dailyRentalrate
                });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            title = "Hello1"
            tags = ["ok"];
            _id = "6349645d1e1efd803c218968"
            name = "Romance"
            numberInStock = 5
            dailyRentalrate = 5
        });

        it("Should return a 401 error if the client is not logged in", async () => {

            token = '';
            const result = await exec();

            expect(result.status).toBe(401);
        });

        it("Should return a 400 error if the genre id is invalid", async () => {
            const result = await exec();
            const genre = await Genre.findById("6349645d1e1efd803c218966");

            expect(genre).toBe(null);
        });

        it("Should save the movie in the database if all the arguments are correct", async () => {
            await exec();

            const movie = Movies.find({ title: "Hello1" });
            expect(movie).not.toBe(null);
        })
    })

    describe("DELETE /:id", () => {
        let token;

        beforeEach(() => {
            token = new User().generateAuthToken();
        });

        it("Should Delete a movies with the given object Id", async () => {
            const movie = new Movies({
                title: "Hello1",
                tags: ["ok"],
                _id: "6349645d1e1efd803c218968",
                name: "Romance",
                numberInStock: 5,
                dailyRentalrate: 5
            });

            await movie.save();

            const result = await request(server).delete("/movies/" + movie._id).set("x-user-auth-token", token);
            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("title", movie.title);
        });

        it("Should return a 401 error if the client is not logged in", async () => {

            token = '';
            const movie = new Movies({
                title: "Hello1",
                tags: ["ok"],
                _id: "6349645d1e1efd803c218968",
                name: "Romance",
                numberInStock: 5,
                dailyRentalrate: 5
            });

            await movie.save();

            const result = await request(server).delete("/movies/" + movie._id).set("x-user-auth-token", token);

            expect(result.status).toBe(401);
        });

        it("Should return a 404 error if the movie with given object id doesn't exist", async () => {
            const id = mongoose.Types.ObjectId();
            const result = await request(server).delete("/movies/" + id).set("x-user-auth-token", token);

            expect(result.status).toBe(404);
        });
    });
})

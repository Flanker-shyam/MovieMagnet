
let server;
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const Movies = require("../../models/moviesModel");

describe("MoviesRoute", ()=>{

    beforeEach(() => { server = require("../../index"); })
    afterEach(async () => {
        server.close();
        await Movies.deleteMany({});
    });

    describe("GET /", ()=>{
        it("Should return all the movies present in the database", (req,res)=>{
            const movie = new Movies()
        })
    })
})
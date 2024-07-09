
const User = require("../../../models/UserModel");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("User.generateAuthToken", () => {
    it("Should return a valid JWT", () => {
        const payload = {_id: new mongoose.Types.ObjectId().toHexString()};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        expect(decoded).toMatchObject(payload);
    })
});
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    category:{
        type: String,
        require : true
    },
});

const Genre = new mongoose.model("Genre" , genreSchema);
module.exports = Genre;
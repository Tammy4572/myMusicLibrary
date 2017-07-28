const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreType: { name: String, required: true},
    description: { type: String, require: true }
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
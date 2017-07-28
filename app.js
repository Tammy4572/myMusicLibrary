const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const data = require('./models/music');
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const router = express.Router();

const application = express();

application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use(bodyParser.urlencoded());

mongoose.connect('mongodb://localhost:27017/albumCollection');

application.use('/public', express.static('./public'));

application.get('/', async (request, response) => {
    var albums = await album.Albums.find()
        .populate("relatedAlbums")
        .exec(function (err, result) {
        });
    var model = { albums: albums }
    response.render('index', model);
});

application.get('/new-item', (request, response ) => {
    response.render('new-item');
});

application.get('/edit-item/:id', async (request, response ) => {
    var albumId = request.params.id;
    var album = await album.Albums.find({ _id: albumId })
        .populate('relatedAlbums')
        .exec(function (err, result ) {
        });
    var model = {
        result: album,
        albumId : albumId
    };
    response.render('edit-item', model);
});

application.post('/new-collection', async (request, response) => {
    var newAlbum = new album.Album({
        artist: request.body.artist,
        title: request.body.title,
        genre: request.body.genre
    })
    newAlbum.sav();
    var album = await album.Album.find({ title: request.body.title });
    var related = new album.RelatedAlbumsl({
        title: request.body.RelatedAlbums
    });
    related.save(function (err, data) {
        album[0].relatedAlbumss.push(data._id);
        album[0].save();
        response.redirect('/');
    });
});

application.post('/edit-collection/:id', async (request, response) => {
    var albumId = request.params.id;
    await data.Albums.findOneAndUpdate({ _id: albumId },
        {
            title: request.body.newTitle,
            artist: request.body.newArtist,
            genre: request.body.newGenre
        })
    response.redirect('/');
});

application.post('/new-collection', async (request, response) => {
    var newAlbum = new data.Albums({
        artist: request.body.artist,
        title: request.body.title,
        genre: request.body.genre,
        length: request.body.length
    })
    newAlbum.save();
    var album = await data.Albums.find({ title: request.body.title });

    var related = new album.RelatedAlbums({
        title: request.body.relatedTitle,
        artist: request.body.relatedartist
    });
    related.save(function (err, data) {
        album[0].relatedAlbums.push(album._id);
        album[0].save();
        response.redirect('/');
    });
});

application.post('/edit-collection/:id', async (request, response) => {
    var albumId = request.params.id;
    await data.Albums.findOneAndUpdate({ _id: albumId },
        {
            title: request.body.newTitle,
            artist: request.body.newartist,
            length: request.body.newLength,
            genre: request.body.newGenre
        })
    response.redirect('/');
});

application.post('/edit-related/:relatedId', async (request, response) => {
    var relatedId = request.params.relatedId;
    var related = await data.RelatedAlbums.findOneAndUpdate({ _id: relatedId },
        {
            title: request.body.newRelatedTitle,
            artist: request.body.newRelatedartist
        }
    );
    response.redirect('/');
});

application.post('/delete/:id', async (request, response) => {
    var albumId = request.params.id;
    await data.Album.deleteOne({ _id: albumsId });
    response.redirect('/');
});

application.post('/add-related/:id', async (request, response) => {
    var albumId = request.params.id;
    var album = await data.albums.findOne({ _id: albumId });

    var related = await new data.RelatedAlbums({
        title: request.body.title,
        artist: request.body.artist
    });
    related.save(async (err, data) => {
        album.relatedalbums.push(related._id);
        album.save();
        response.redirect('/');
    });
});

application.listen(3000);
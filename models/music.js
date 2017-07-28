const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const albumsSchema = new mongoose.Schema ({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    songTitle: { type: String, required: true },
    relatedAlbums: [{ type: Schema.Types.ObjecId, ref: "RelatedAlbums"}]
});

const Album = mongoose.model('Album', albumSchema);

const RelatedAlbumsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String },
});

const RelatedAlbums = mongoose.model('RelatedAlbums', RelatedAlbumsSchema);

module.exports = {
    Albums: Album,
    RelatedAlbums: RelatedAlbums
};

// var album = new Album({ 
//     albumTitle: '21',
//     singer: 'Adele',
//     genre: 'Soul',
//     songTitle: { 
//         songId: ['Rolling In The Deep'],
//         songId: ['Rumour Has It'],
//         songId: ['Turning Tables'], 
//         songId: ['Don\'t You Remember'],
//         songId: ['Set Fire To The Rain'],
//         songId: ['He Won\'t Go'],
//         songId: ['Take It All']
//     }
// });

// var album = new Album({ 
//     albumTitle: 'Weird Al: Greatest Hits',
//     singer: 'Weird Al Yankovic',
//     genre:  'Comedy',
//     songs: { 
//         song1: ['Fat'],
//         song2: ['Eat It'],
//         song3: ['Ricky'], 
//         song4: ['Addicted to Spuds'],
//         song5: ['Dare to be Stupid'],
//         song6: ['Lasagna'],
//         song7: ['I Lost on Jeopardy']
//     }
// });
import Wrappify from '../src/index';

global.fetch = require('node-fetch');

const spotify = new Wrappify({
  token: 'BQBTRNoSbceJBNzwfPdTEwf0Q7seTdt2CXHImmny58U2P1kE9I2COK0GzH3QM46Xp55j6h1X1BKmxaeERHpfjkRfmXrcDOACZUC5eRcu87QF2yAFYi4CPeGwROctfgdnHhXRpyNdU3gtW7rzWQA',
});

const albums = spotify.search.albums('Meteora');

albums.then(data => data.albums.items.map(item => console.log(item.name)));

/* global fetch */

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from './search';

import album from './album';

import { API_URL } from './config';

// module.exports = {
//   search,
//   searchAlbums,
//   searchArtists,
//   searchTracks,
//   searchPlaylists,
//   getAlbum,
//   getAlbums,
//   getAlbumTracks,
// };

export default class Wrappify {
  constructor(options = {}) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;

    this.album = album.bind(this)();
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return fetch(url, headers);
  }
}

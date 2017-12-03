/* global describe beforeEach it context afterEach */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exists the search method', () => expect(search).to.exist);

    it('should exists the searchAlbums method', () => expect(searchAlbums).to.exist);

    it('should exists the searchArtists method', () => expect(searchArtists).to.exist);

    it('should exists the searchTracks method', () => expect(searchTracks).to.exist);

    it('should exists the searchPlaylists method', () => expect(searchPlaylists).to.exist);
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Muse', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

        const albums = search('Hybryd Theory', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Hybryd Theory&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      const artists2 = searchArtists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Hybryd Theory');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Hybryd Theory&type=album');

      const albums2 = searchAlbums('Meteora');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Meteora&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Numb');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Numb');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Numb&type=track');

      const tracks2 = searchTracks('In The End');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=In The End&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Linkin Park');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Linkin Park');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Linkin Park&type=playlist');

      const playlists2 = searchPlaylists('Ghost BC');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost BC&type=playlist');
    });
  });
});

/* global describe beforeEach it context afterEach */

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import Wrappify from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new Wrappify({
      token: 'foo',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exists the spotify.search.albums method', () => expect(spotify.search.albums).to.exist);

    it('should exists the spotify.search.artists method', () => expect(spotify.search.artists).to.exist);

    it('should exists the spotify.search.tracks method', () => expect(spotify.search.tracks).to.exist);

    it('should exists the spotify.search.playlists method', () => expect(spotify.search.playlists).to.exist);
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      const artists2 = spotify.search.artists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Hybryd Theory');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Hybryd Theory&type=album');

      const albums2 = spotify.search.albums('Meteora');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Meteora&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Numb');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Numb');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Numb&type=track');

      const tracks2 = spotify.search.tracks('In The End');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=In The End&type=track');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists('Linkin Park');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = spotify.search.playlists('Linkin Park');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Linkin Park&type=playlist');

      const playlists2 = spotify.search.playlists('Ghost BC');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Ghost BC&type=playlist');
    });
  });
});

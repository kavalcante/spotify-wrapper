/* global describe it beforeEach afterEach */

import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import Wrappify from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Wrappify', () => {
  it('should create an instance of Wrappify', () => {
    const spotify = new Wrappify();

    expect(spotify).to.be.an.instanceOf(Wrappify);
  });

  it('should receive API_URL as an option', () => {
    const spotify = new Wrappify({
      apiURL: 'lalala',
    });

    expect(spotify.apiURL).to.be.equal('lalala');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new Wrappify();
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new Wrappify({
      token: 'foo',
    });

    expect(spotify.token).to.be.equal('foo');
  });

  describe('Request Method', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should have request method', () => {
      const spotify = new Wrappify();

      return expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      const spotify = new Wrappify({
        token: 'foo',
      });

      spotify.request('url');

      return expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the right url passed', () => {
      const spotify = new Wrappify({
        token: 'foo',
      });

      spotify.request('url');

      return expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('should call fetch with the right headers passed', () => {
      const spotify = new Wrappify({
        token: 'foo',
      });

      const headers = {
        headers: {
          Authorization: 'Bearer foo',
        },
      };

      spotify.request('url');

      return expect(fetchedStub).to.have.been.calledWith('url', headers);
    });
  });
});

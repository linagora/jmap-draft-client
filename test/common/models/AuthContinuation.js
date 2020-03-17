'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The AuthContinuation class', function() {
  describe('constructor', function() {
    it('should throw if payload parameter is not defined', function() {
      expect(function() {
        new jmapDraft.AuthContinuation();
      }).to.throw(Error);
    });

    it('should throw if payload.loginId parameter is not defined', function() {
      expect(function() {
        var payload = { methods: [] };

        new jmapDraft.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.methods parameter is not defined', function() {
      expect(function() {
        var payload = { loginId: 'loginId1' };

        new jmapDraft.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.methods parameter is not an array', function() {
      expect(function() {
        var payload = { loginId: 'loginId1', methods: 'password' };

        new jmapDraft.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.methods parameter is not an array of objects', function() {
      expect(function() {
        var payload = { loginId: 'loginId1', methods: ['oauth', 'password'] };

        new jmapDraft.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should expose loginId and methods properties', function() {
      var payload = {
        loginId: 'loginId1',
        methods: [
          { type: 'password' },
          { type: 'external' }
        ]
      };
      var authContinuation = new jmapDraft.AuthContinuation(payload);

      expect(authContinuation.loginId).to.equal(payload.loginId);
      expect(authContinuation.methods).to.deep.equal(payload.methods);
    });

  });

  describe('The getMethod method', function() {
    it('should throw if invalid type parameter is provided', function() {
      expect(function() {
        var payload = {
          loginId: 'loginId1',
          methods: [
            { type: 'password' }
          ]
        };
        var authContinuation = new jmapDraft.AuthContinuation(payload);

        authContinuation.getMethod(null);
      }).to.throw(Error);
    });

    it('should throw if the given type is not supported', function() {
      expect(function() {
        var payload = {
          loginId: 'loginId1',
          methods: [
            { type: 'password' }
          ]
        };
        var authContinuation = new jmapDraft.AuthContinuation(payload);

        authContinuation.getMethod('oauth');
      }).to.throw(Error);
    });

    it('should return an AuthMethod instance', function() {
      var payload = {
        loginId: 'loginId1',
        methods: [
          { type: 'external' },
          { type: 'password' }
        ]
      };
      var authContinuation = new jmapDraft.AuthContinuation(payload);

      expect(authContinuation.getMethod('password')).to.be.an.instanceof(jmapDraft.AuthMethod);
    });
  });

  describe('The supports method', function() {
    it('should throw if invalid type parameter is provided', function() {
      expect(function() {
        var payload = {
          loginId: 'loginId1',
          methods: [
            { type: 'password' }
          ]
        };
        var authContinuation = new jmapDraft.AuthContinuation(payload);

        authContinuation.supports(null);
      }).to.throw(Error);
    });

    it('should return true if type is supported', function() {
      var payload = {
        loginId: 'loginId1',
        methods: [
          { type: 'totp' },
          { type: 'password' }
        ]
      };
      var authContinuation = new jmapDraft.AuthContinuation(payload);

      expect(authContinuation.supports('password')).to.be.true;
    });

    it('should return false if type is not supported', function() {
      var payload = {
        loginId: 'loginId1',
        methods: [
          { type: 'password' }
        ]
      };
      var authContinuation = new jmapDraft.AuthContinuation(payload);

      expect(authContinuation.supports('oauth')).to.be.false;
    });
  });
});

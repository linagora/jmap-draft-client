'use strict';

var expect = require('chai').expect,
  jmapDraft = require('../../../dist/jmap-draft-client');

describe('The SetResponse class', function() {

  describe('The constructor', function() {

    it('should use default values for all fields if not defined', function() {
      var response = new jmapDraft.SetResponse({});

      expect(response.accountId).to.equal(null);
      expect(response.oldState).to.equal(null);
      expect(response.newState).to.equal('');
      expect(response.created).to.deep.equal({});
      expect(response.updated).to.deep.equal([]);
      expect(response.destroyed).to.deep.equal([]);
      expect(response.MDNSent).to.deep.equal([]);
      expect(response.notCreated).to.deep.equal({});
      expect(response.notUpdated).to.deep.equal({});
      expect(response.notDestroyed).to.deep.equal({});
      expect(response.MDNNotSent).to.deep.equal({});
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmapDraft.SetResponse({}, { accountId: 'id' }).accountId).to.equal('id');
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmapDraft.SetResponse.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should return an instance of SetResponse', function() {
      expect(jmapDraft.SetResponse.fromJSONObject({}, {})).to.be.an.instanceof(jmapDraft.SetResponse);
    });

    it('should use default values for for all fields if not defined', function() {
      var response = jmapDraft.SetResponse.fromJSONObject({}, {});

      expect(response.accountId).to.equal(null);
      expect(response.oldState).to.equal(null);
      expect(response.newState).to.equal('');
      expect(response.created).to.deep.equal({});
      expect(response.updated).to.deep.equal([]);
      expect(response.destroyed).to.deep.equal([]);
      expect(response.MDNSent).to.deep.equal([]);
      expect(response.notCreated).to.deep.equal({});
      expect(response.notUpdated).to.deep.equal({});
      expect(response.notDestroyed).to.deep.equal({});
      expect(response.MDNNotSent).to.deep.equal({});
    });

    it('should copy values for all fields if defined', function() {
      var response = jmapDraft.SetResponse.fromJSONObject({}, {
        accountId: 'id',
        created: {
          ABCD: {
            id: 'mailboxId'
          }
        },
        MDNNotSent: {
          EFGH: {
            type: 'invalidArguments',
            description: 'lorem ipsum'
          }
        }
      });

      expect(response.accountId).to.equal('id');
      expect(response.created).to.deep.equal({
        ABCD: {
          id: 'mailboxId'
        }
      });
      expect(response.MDNNotSent).to.shallowDeepEqual({
        EFGH: {
          type: 'invalidArguments',
          description: 'lorem ipsum'
        }
      });
    });

  });

});

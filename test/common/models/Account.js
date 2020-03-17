'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The Account class', function() {

  function accountWithDefaultValues(id) {
    return {
      _jmap: {},
      id: id,
      name: '',
      isPrimary: false,
      isReadOnly: false,
      hasDataFor: []
    };
  }

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmapDraft.Account({});
      }).to.throw(Error);
    });

    it('should use default values if opts is not defined', function() {
      expect(new jmapDraft.Account({}, 'id')).to.deep.equal(accountWithDefaultValues('id'));
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmapDraft.Account({}, 'id', {})).to.deep.equal(accountWithDefaultValues('id'));
    });

    it('should allow defining optional properties through the opts object', function() {
      var expectedAccount = {
        name: 'name',
        isPrimary: true,
        isReadOnly: false,
        hasDataFor: ['mail', 'contacts', 'calendars']
      };
      var account = new jmapDraft.Account({}, 'id', expectedAccount);

      expectedAccount._jmap = {};
      expectedAccount.id = 'id';

      expect(account).to.deep.equal(expectedAccount);
    });

  });

  describe('The getMailboxes method', function() {

    it('should delegate to the jmap client, passing the accountId in the options', function(done) {
      new jmapDraft.Account({
        getMailboxes: function(options) {
          expect(options.accountId).to.equal('id');

          done();
        }
      }, 'id').getMailboxes();
    });

    it('should preserve other options', function(done) {
      new jmapDraft.Account({
        getMailboxes: function(options) {
          expect(options).to.deep.equal({
            accountId: 'id',
            a: 'b',
            c: 0
          });

          done();
        }
      }, 'id').getMailboxes({ a: 'b', c: 0 });
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmapDraft.Account.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.id is not defined', function() {
      expect(function() {
        jmapDraft.Account.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should return an instance of Account', function() {
      expect(jmapDraft.Account.fromJSONObject({}, { id: 'id' })).to.be.an.instanceof(jmapDraft.Account);
    });

    it('should use default values if no opts is given', function() {
      expect(jmapDraft.Account.fromJSONObject({}, { id: 'myId' })).to.deep.equal(accountWithDefaultValues('myId'));
    });

    it('should copy values for id, name and isPrimary if defined', function() {
      var account = jmapDraft.Account.fromJSONObject({}, {
        id: 'id',
        name: 'name',
        isPrimary: true,
        hasDataFor: ['calendars']
      });

      expect(account.id).to.equal('id');
      expect(account.name).to.equal('name');
      expect(account.isPrimary).to.equal(true);
      expect(account.hasDataFor).to.deep.equal(['calendars']);
      expect(account.isReadOnly).to.equal(false);
    });

  });

  describe('The hasMail method', function() {

    it('should return false when the account has no mail capabilities', function() {
      expect(new jmapDraft.Account({}, 'id').hasMail()).to.equal(false);
    });

    it('should return true when the account has mail capabilities defined', function() {
      expect(new jmapDraft.Account({}, 'id', { hasDataFor: ['mail'] }).hasMail()).to.equal(true);
    });

  });

  describe('The hasCalendars method', function() {

    it('should return false when the account has no calendars capabilities', function() {
      expect(new jmapDraft.Account({}, 'id').hasCalendars()).to.equal(false);
    });

    it('should return true when the account has calendars capabilities defined', function() {
      expect(new jmapDraft.Account({}, 'id', { hasDataFor: ['calendars'] }).hasCalendars()).to.equal(true);
    });

  });

  describe('The hasContacts method', function() {

    it('should return false when the account has no contacts capabilities', function() {
      expect(new jmapDraft.Account({}, 'id').hasContacts()).to.equal(false);
    });

    it('should return true when the account has contacts capabilities defined', function() {
      expect(new jmapDraft.Account({}, 'id', { hasDataFor: ['contacts'] }).hasContacts()).to.equal(true);
    });

  });

});

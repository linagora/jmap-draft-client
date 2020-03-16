'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client'),
    q = require('q');

describe('The Thread class', function() {

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmapDraft.Thread({});
      }).to.throw(Error);
    });

    it('should use default value for messageIds if not defined', function() {
      expect(new jmapDraft.Thread({}, 'id').messageIds).to.deep.equal([]);
    });

    it('should use default value for messageIds if an empty opts object is given', function() {
      expect(new jmapDraft.Thread({}, 'id', {}).messageIds).to.deep.equal([]);
    });

    it('should allow defining messageIds through the opts object', function() {
      expect(new jmapDraft.Thread({}, 'id', { messageIds: ['id1'] }).messageIds).to.deep.equal(['id1']);
    });

  });

  describe('The getMessages method', function() {

    it('should delegate to the jmap client, passing ids in the options, when no options are given', function(done) {
      new jmapDraft.Thread({
        getMessages: function(options) {
          expect(options).to.deep.equal({
            ids: ['id1', 'id2']
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2']
      }).getMessages();
    });

    it('should preserve other options', function(done) {
      new jmapDraft.Thread({
        getMessages: function(options) {
          expect(options).to.deep.equal({
            ids: ['id1', 'id2'],
            properties: ['id', 'body']
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2']
      }).getMessages({ properties: ['id', 'body'] });
    });

  });

  describe('The destroy method', function() {

    it('should delegate to the jmap client, passing ids in the options', function(done) {
      new jmapDraft.Thread({
        destroyMessages: function(ids) {
          expect(ids).to.deep.equal(['id1', 'id2']);

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2']
      }).destroy();
    });

  });

  describe('The moveToMailboxWithRole method', function() {

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmapDraft.Thread({
        getMailboxWithRole: function(role) {
          expect(role).to.equal('inbox');

          return q({ id: 'inbox' });
        },
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { mailboxIds: ['inbox'] },
              id2: { mailboxIds: ['inbox'] },
              id3: { mailboxIds: ['inbox'] }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).moveToMailboxWithRole('inbox');
    });

  });

  describe('The move method', function() {

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmapDraft.Thread({
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { mailboxIds: ['m1', 'm2'] },
              id2: { mailboxIds: ['m1', 'm2'] },
              id3: { mailboxIds: ['m1', 'm2'] }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).move(['m1', 'm2']);
    });

  });

  describe('The setIsFlagged method', function() {

    it('should throw an Error if isFlagged is not defined', function() {
      expect(function() {
        jmapDraft.Thread.setIsFlagged();
      }).to.throw(Error);
    });

    it('should throw an Error if isFlagged is not a Boolean', function() {
      expect(function() {
        jmapDraft.Thread.setIsFlagged(1);
      }).to.throw(Error);
    });

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmapDraft.Thread({
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { isFlagged: true },
              id2: { isFlagged: true },
              id3: { isFlagged: true }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).setIsFlagged(true);
    });

  });

  describe('The setIsUnread method', function() {

    it('should throw an Error if isUnread is not defined', function() {
      expect(function() {
        jmapDraft.Thread.setIsUnread();
      }).to.throw(Error);
    });

    it('should throw an Error if isUnread is not a Boolean', function() {
      expect(function() {
        jmapDraft.Thread.setIsUnread(1);
      }).to.throw(Error);
    });

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmapDraft.Thread({
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { isUnread: true },
              id2: { isUnread: true },
              id3: { isUnread: true }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).setIsUnread(true);
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmapDraft.Thread.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.id is not defined', function() {
      expect(function() {
        jmapDraft.Thread.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should return an instance of Thread', function() {
      expect(jmapDraft.Thread.fromJSONObject({}, { id: 'id' })).to.be.an.instanceof(jmapDraft.Thread);
    });

    it('should use default value for messageIds if not defined', function() {
      expect(jmapDraft.Thread.fromJSONObject({}, { id: 'id' }).messageIds).to.deep.equal([]);
    });

    it('should copy value for messageIds if defined', function() {
      var thread = jmapDraft.Thread.fromJSONObject({}, {
        id: 'id',
        messageIds: ['id1', 'id2']
      });

      expect(thread.id).to.equal('id');
      expect(thread.messageIds).to.deep.equal(['id1', 'id2']);
    });

  });

});

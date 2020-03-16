'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The MailboxRole class', function() {

  describe('The fromRole method', function() {

    it('should return MailboxRole.UNKNOWN when the role is not defined', function() {
      expect(jmapDraft.MailboxRole.fromRole()).to.equal(jmapDraft.MailboxRole.UNKNOWN);
    });

    it('should return MailboxRole.UNKNOWN when the role is null', function() {
      expect(jmapDraft.MailboxRole.fromRole(null)).to.equal(jmapDraft.MailboxRole.UNKNOWN);
    });

    it('should return MailboxRole.UNKNOWN when the role is the empty String', function() {
      expect(jmapDraft.MailboxRole.fromRole('')).to.equal(jmapDraft.MailboxRole.UNKNOWN);
    });

    it('should return MailboxRole.UNKNOWN when the role is not found', function() {
      expect(jmapDraft.MailboxRole.fromRole('test')).to.equal(jmapDraft.MailboxRole.UNKNOWN);
    });

    it('should return the correct MailboxRole for all predefined JMAP roles', function() {
      ['inbox', 'archive', 'drafts', 'outbox', 'sent', 'trash', 'spam', 'templates'].forEach(function(role) {
        expect(jmapDraft.MailboxRole.fromRole(role)).to.equal(jmapDraft.MailboxRole[role.toUpperCase()]);
      });
    });

  });

  it('should contain class constants for predefined JMAP roles', function() {
    ['inbox', 'archive', 'drafts', 'outbox', 'sent', 'trash', 'spam', 'templates'].forEach(function(role) {
      expect(jmapDraft.MailboxRole[role.toUpperCase()].value).to.equal(role);
    });
  });

  it('should expose the UNKNOWN role', function() {
    expect(jmapDraft.MailboxRole.UNKNOWN.value).to.equal(null);
  });

});

'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The MailCapabilities class', function() {

  var defaultMailCapabilities = {
    ns: jmapDraft.Constants.MAIL_CAPABILITIES_URI,
    maxMailboxesPerMessage: null,
    maxSizeMessageAttachments: 0,
    maxDelayedSend: 0,
    messageListSortOptions: [],
    submissionExtensions: {}
  };

  describe('The constructor', function() {

    it('should use default values if opts is not defined', function() {
      expect(new jmapDraft.MailCapabilities()).to.deep.equal(defaultMailCapabilities);
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmapDraft.MailCapabilities({})).to.deep.equal(defaultMailCapabilities);
    });

    it('should allow defining values through the opts object', function() {
      var capabilities = new jmapDraft.MailCapabilities({
        maxMailboxesPerMessage: 8,
        maxSizeMessageAttachments: 1234,
        maxDelayedSend: 120,
        messageListSortOptions: ['date', 'id'],
        submissionExtensions: { DSN: ['RET=HDRS'] }
      });

      expect(capabilities.ns).to.equal(jmapDraft.Constants.MAIL_CAPABILITIES_URI);
      expect(capabilities.maxMailboxesPerMessage).to.equal(8);
      expect(capabilities.maxSizeMessageAttachments).to.equal(1234);
      expect(capabilities.maxDelayedSend).to.equal(120);
      expect(capabilities.messageListSortOptions).to.deep.equal(['date', 'id']);
      expect(capabilities.submissionExtensions).to.deep.equal({ DSN: ['RET=HDRS'] });
    });

  });

});

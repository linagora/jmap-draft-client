'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The ServerCapabilities class', function() {
  describe('The constructor', function() {
    var defaultValues = {
      maxSizeUpload: 0,
      maxSizeRequest: 0,
      maxConcurrentUpload: 1,
      maxConcurrentRequests: 1,
      maxCallsInRequest: 1,
      maxObjectsInGet: 0,
      maxObjectsInSet: 0
    };

    it('should use default values if opts is not defined', function() {
      expect(new jmapDraft.ServerCapabilities()).to.deep.equal(defaultValues);
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmapDraft.ServerCapabilities()).to.deep.equal(defaultValues);
    });

    it('should allow defining values through the opts object', function() {
      var opts = {
        maxSizeUpload: 1234,
        maxConcurrentUpload: 1,
        maxSizeRequest: 1234,
        maxConcurrentRequests: 5,
        maxCallsInRequest: 10,
        maxObjectsInGet: 100,
        maxObjectsInSet: 100
      };

      expect(new jmapDraft.ServerCapabilities(opts)).to.deep.equal(opts);
    });

  });

});

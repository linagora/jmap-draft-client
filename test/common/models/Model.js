'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The Model class', function() {

  describe('The constructor', function() {

    it('should store the Client instance as _jmap', function() {
      var client = { client: 'jmap' };

      expect(new jmapDraft.Model(client)._jmap).to.deep.equal(client);
    });

  });

});

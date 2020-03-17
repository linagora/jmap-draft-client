'use strict';

var expect = require('chai').expect,
    jmapDraft = require('../../../dist/jmap-draft-client');

describe('The EMailer class', function() {

  describe('The constructor', function() {

    it('should use default value for name and email if not defined', function() {
      var emailer = new jmapDraft.EMailer();

      expect(emailer.name).to.equal('');
      expect(emailer.email).to.equal('@');
    });

    it('should use default value for name and email if an empty opts object is given', function() {
      var emailer = new jmapDraft.EMailer({});

      expect(emailer.name).to.equal('');
      expect(emailer.email).to.equal('@');
    });

    it('should allow defining name and email through the opts object', function() {
      var emailer = new jmapDraft.EMailer({
        name: 'emailer',
        email: 'email@domain'
      });

      expect(emailer.name).to.equal('emailer');
      expect(emailer.email).to.equal('email@domain');
    });

  });

  describe('The unknown static method', function() {

    it('should return an EMailer object', function() {
      expect(jmapDraft.EMailer.unknown()).to.be.an.instanceof(jmapDraft.EMailer);
    });

    it('should return an EMailer object with all properties set to default values', function() {
      expect(jmapDraft.EMailer.unknown()).to.deep.equal(new jmapDraft.EMailer());
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should return an EMailer object', function() {
      expect(jmapDraft.EMailer.fromJSONObject()).to.be.an.instanceof(jmapDraft.EMailer);
    });

    it('should return an EMailer object with all properties set to default values when nothing given', function() {
      expect(jmapDraft.EMailer.fromJSONObject()).to.deep.equal(jmapDraft.EMailer.unknown());
    });

    it('should return an EMailer with properties set when given', function() {
      expect(jmapDraft.EMailer.fromJSONObject(null, { name: 'name', email: 'email' })).to.deep.equal(new jmapDraft.EMailer({
        name: 'name',
        email: 'email'
      }));
    });

  });

});

'use strict';

var jmapDraft = require('../../dist/jmap-draft-client.min'),
    q = require('q'),
    options = require('node-getopt')
    .create([ ['', 'authUrl=ARG', ''], ['', 'username=ARG', ''], ['', 'deviceName=ARG', ''] ])
    .parseSystem().options;

function continuationCallback(authContinuation) {
  return q.resolve(authContinuation.continuationToken);
}

var client = new jmapDraft.Client(new jmapDraft.RequestTransport(), new jmapDraft.QPromiseProvider())
  .withAuthenticationUrl(options.authUrl)
  .authExternal(options.username, options.deviceName, continuationCallback)
  .then(function(authAccess) {
    client.withAuthenticationToken(authAccess.accessToken);
    console.log('client is authenticated, accesstoken=',authAccess.accessToken);
  }, function(err) {
    console.log('something went horribly wrong', err);
  });

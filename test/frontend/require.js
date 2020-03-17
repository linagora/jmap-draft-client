'use strict';

/* global jmapDraft: false, chai: false, Q: false, sinon: false */

window.require = function(name) {
  if (/jmap-draft-client/.test(name)) {
    return jmapDraft;
  }

  if (name === 'chai') {
    return chai;
  }

  if (name === 'q') {
    return Q;
  }

  if (name === 'sinon') {
    return sinon;
  }

  // chai plugins are self-registering in the browser
  // we're returning a noop function so that the call to chai.use() does nothing
  if (name === 'chai-datetime' || name === 'chai-shallow-deep-equal' || name === 'sinon-chai') {
    return function() {};
  }
};

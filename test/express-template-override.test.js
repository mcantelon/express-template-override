// Run $ expresso

/**
 * Module dependencies.
 */

var assert = require('assert');

module.exports = {

  'layout override': function() {

    var app = require('./fixtures/test_app/app');
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Override title</title>');
      });
  },

  'index override': function() {
    
    var app = require('./fixtures/test_app/app');
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<p>Override index.jade</p>');
      });
  }
};

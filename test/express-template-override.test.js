// Run $ expresso

/**
 * Module dependencies.
 */

var assert = require('assert');

module.exports = {

  /*
  'layout override': function() {

    var app = require('./fixtures/two_template_override/app');

    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Override title</title>');
      }
    );
  },

  'index override': function() {
    
    var app = require('./fixtures/two_template_override/app');

    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<p>Override index.jade</p>');
      }
    );
  },

  'layout override only': function() {

    var app = require('./fixtures/layout_template_override_only/app');

    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<p>Normal index.jade</p>');
      }
    );
  },
  */

  'partial override': function() {

    var app = require('./fixtures/partial_override/app');

    setTimeout(function() {
      assert.response(app,
        { url: '/' },
        { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
        function(res){
          assert.includes(res.body, '<h1>Override partial</h1>');
        }
      );
    }, 500);
  }
};

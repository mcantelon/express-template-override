/*!
 * Express Template Override
 * Copyright(c) 2011 Mike Cantelon <mcantelon@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , Walker = require('walker')
  , View = require('express/lib/view/view').prototype;

/**
 * Cycle through override templates to create path
 * substitution hash.
 */

function expandRelativePaths(app, options, cb) {

  var absoluteReplacePath
    , absoluteWithPath;

  loadOverrides(app, options.overrides, function(templates) {

    options.absoluteOverrides = {};

    for(var template in templates) {

      var replacePath = templates[template];

      options.absoluteOverrides[app.set('views') + '/' + replacePath]
        = options.overrides + '/' + replacePath;
    }

    cb(options);
  })
}

/**
 * Load templates in overrides directory.
 */

function loadOverrides(app, overrides, cb) {

  var templates = [];

  path.exists(overrides, function(exists) {

    if (exists) {

      Walker(overrides)
        .on('file', function(file) {
          templates.push(file.replace(overrides + '/', ''));
        })
       .on('end', function() {
          cb(templates);
        })
    }
    else {

      var err = new Error('The overrides path does not exist.');
      throw err;
    }
  })
}

/**
 * Monkey-patch Express's path resolver to do template overrides.
 */

exports.configure = function(app, options) { 

  expandRelativePaths(app, options, function(options) {

    // store original view path resolver
    var original = View.resolvePath;

    // replace view path resolver to handle overrides
    View.resolvePath = function() {

      // get normal path
      var path = original.call(this);

      // return path override, if applicable
      if (options.absoluteOverrides[path]) {
        path = (options.absoluteOverrides[path])
          ? (options.absoluteOverrides[path])
          : path;
      }

      if (options.debug) {
        console.log(path);
      }

      return path;
    }

    View.patchedByExpressTemplateOverride = true;
  })
}

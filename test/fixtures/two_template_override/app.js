var express = require('express')
  , override = require('../../../lib/express-template-override')
  , View = require('express/lib/view/view').prototype;

var app = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(app.router);
});

override.configure(app, {'overrides': __dirname + '/overrides'});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
else {

  // if app being used as a module, export function that returns
  //  a function that waits for monkey patching to complete
  module.exports = function() {

    return function(cb) {

      function wait() {
        process.nextTick(function() {
          if (!View.patchedByExpressTemplateOverride) {
            wait();
          }
          else {
            cb(app);
          }
        })
      }

      wait();
    }
  }
}

# express-template-override

This Node module is made for those creating web applications using the Express
Node.js-driven framework.

This module allows the optional overriding of templates in an Express-driven
application. This is to allow the user of the Express application to customize
their installation without modifying the original template code. This allows
the user to be able to reference the original template and more easily upgrade
the Express-driven application when new versions come out.

It works by allowing a secondary views directory to override the main views
directory if both directories contain a template file with the same name.

Here's a sample setup:

    var express = require('express')
      , app = express.createServer()
      , override = require('./lib/express-template-override');

    app.configure(function(){
      app.set('views', __dirname + '/views');
      ...
    });

    override.configure(app, {'overrides': __dirname + 'my_overrides'});

With the above setup, if you put any templates in the `my_overrides` directory
that have the same filename as a template in your main `views` directory then
the template in `my_overrides` will get used by Express.

This module hasn't been extensively tested, so use at your own risk.
[![build status](https://secure.travis-ci.org/mcantelon/express-template-override.png)](http://travis-ci.org/mcantelon/express-template-override)
# express-template-override

This Node module is made for those creating web applications, using the Express
Node.js-driven framework, that they want others to install and use (blog
engines, etc.).

This module allows the optional overriding of templates. This is to allow the
admin of the Express application to customize their installation without
modifying the template distributed with the source. This allows the user to be
able to reference the original template and more easily upgrade the
Express-driven application when new versions come out.

It works by monkey-patching Express to allow a secondary views directory to
override the main views directory if both directories contain a template file
with the same name.

Here's a sample setup:

    var express = require('express')
      , app = express.createServer()
      , override = require('./lib/express-template-override');

    app.configure(function(){
      app.set('views', __dirname + '/views');
      // etc.
    });

    override.configure(app, {'overrides': __dirname + '/my_overrides'});

With the above setup, if you put any templates in the `my_overrides` directory
that have the same filename as a template in your main `views` directory then
the template in `my_overrides` will get used by Express.

## Installation

Install via npm with:

    npm install express-template-override

## Testing

Install expresso if you haven't already:

    npm install expresso

Change to this project's root directory and enter:

    expresso

One day in a galaxy far, far away… someone might want to read your project history.

Get a preview today: http://starlogs.net

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/artemave/starlogs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

### Want to hack on it?

No problem. But first, it is not just Javascript and CSS. It is [pogoscript](http://pogoscript.org/) and [sass](http://sass-lang.com/). Oh, and they require node.js and ruby respectively.

If that does not put you off, I give up! Clone the project:

    $ git clone git://github.com/artemave/StarLogs.git && cd StarLogs

Get pogo:

    $ npm install -g pogo

Leave it autocompile:

    $ pogo -cw javascripts/*.pogo

Get sass:

    $ gem install sass # with sudo unless on rvm, rbenv, etc.

Leave it autocompile:

    $ sass --watch stylesheets:stylesheets

Serve project folder:

    $ npm install -g serve
    $ serve

Navigate to http://localhost:3000/starlogs.html and take it from there!

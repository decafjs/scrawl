/**
 * Created by mschwartz on 2/28/15.
 */

/*global require */

require.paths.unshift('lib');
require.paths.unshift('node_modules');

var Application  = require('decaf-jolt').Application,
    StaticFile   = require('decaf-jolt-static').StaticFile,
    StaticServer = require('decaf-jolt-static').StaticServer,
    SjsFile      = require('decaf-jolt-sjs').SjsFile,
    app          = new Application(),
    marked       = require('marked');

// Synchronous highlighting with highlight.js
//marked.setOptions({
//    highlight: function (code) {
//        try {
//            return require('highlight.js').highlightAuto(code).value;
//        }
//        catch (e) {
//            console.exception(e);
//            return code;
//        }
//    }
//});
//var h = require('highlight.js/src');
//console.dir(h);

//marked.setOptions({
//    highlight: function (code, lang, callback) {
//        require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
//            callback(err, result.toString());
//        });
//    }
//});
// serve static/favicon.ico when URL is /favicon.ico
app.verb('favicon.ico', StaticFile('static/favicon.ico'));

// serve bower_components from bower_components directory
app.verb('bower_components', StaticServer('bower_components'));

// serve css stylesheets from css directory when the URL starts with /css/
app.verb('css', StaticServer('css'));

// serve js files from js directory when the URL starts with /js/
app.verb('js', StaticServer('js'));

// serve image files from images directory when the URL starts with /images/
app.verb('images', StaticServer('images'));

// serve / URL via Home controller
app.verb('/', SjsFile('controllers/Home.sjs'));

// '127.0.0.1' is localhost only
// '0.0.0.0' to listen on all interfaces
var listenAddress = '127.0.0.1';

app.listen(9090, listenAddress);
console.log('HTTP server listening at http://' + listenAddress + ':9090');

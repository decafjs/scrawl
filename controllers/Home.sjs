/*global require, req, res */

var TemplateManager = require('decaf-hoganjs').TemplateManager,
    views           = new TemplateManager('views'),
    dox             = require('dox'),
    marked          = require('marked'),
    File            = require('File'),
    Config          = require('Config');

var base_dir   = Config.projectDirectory + '/',
    base_len   = base_dir.length,
    bower_json = JSON.parse(new File(base_dir + 'bower.json').readAll());

var paths = [];
decaf.each(bower_json.scrawl, function ( path ) {
    decaf.each(new File(Config.projectDirectory + '/' + path).listRecursive(), function ( path ) {
        if ( new File(path).isDirectory() ) {
            paths.push({ directory : true, name : path.substr(base_len) });
        }
        else {
            paths.push({ directory : false, name : path.substr(base_len) });
        }
    });
});

var readme = new File(base_dir + 'README.md').readAll();
var document = {
    title     : 'Home Page',     // for <title> tag
    base_path : base_dir,
    paths     : paths,
    date      : new Date().toLocaleDateString(),
    //content   : marked('```javascript\nfunction foo() {\nconsole.log("here");\n}```')
    content   : marked(readme)
};

res.send(views[ 'Home' ].render(document, views));

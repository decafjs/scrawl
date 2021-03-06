/*global require, req, res */

var TemplateManager = require('decaf-hoganjs').TemplateManager,
    views           = new TemplateManager('views'),
    dox             = require('dox'),
    marked          = require('marked'),
    File            = require('File'),
    Config          = require('Config');

var base_dir   = Config.projectDirectory + '/',
    base_len   = base_dir.length,
    bower_json = JSON.parse(new File(base_dir + 'bower.json').readAll()),
    source_filename = req.args.join('/');

var paths = [
    { directory: false, name: 'Home', path: '/', active: true }
];
decaf.each(bower_json.scrawl, function ( path ) {
    decaf.each(new File(Config.projectDirectory + '/' + path).listRecursive(), function ( path ) {
        var short_path = path.substr(base_len);
        if ( new File(path).isDirectory() ) {
            paths.push({ directory : true, name : short_path, path: '/documentation/'+short_path });
        }
        else {
            paths.push({ directory : false, name : short_path, path: '/documentation/'+short_path, active: short_path === source_filename });
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

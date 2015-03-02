/*global require, req, res */

var TemplateManager = require('decaf-hoganjs').TemplateManager,
    views           = new TemplateManager('views'),
    dox             = require('dox'),
    marked          = require('marked'),
    File            = require('File'),
    Config          = require('Config');

var base_dir        = Config.projectDirectory + '/',
    base_len        = base_dir.length,
    bower_json      = JSON.parse(new File(base_dir + 'bower.json').readAll()),
    source_filename = req.args.join('/');

var paths = [
    { directory: false, name: 'Home', path: '/' }
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

var source    = new File(base_dir + source_filename).readAll(),
    parsed    = dox.parseComments(source, { skipSingleStar : true }),
    formatted = builtin.print_r(dox.parseComments(source));

var document = {
    title     : source_filename,     // for <title> tag
    base_path : base_dir,
    paths     : paths,
    date      : new Date().toLocaleDateString(),
    source    : source,
    dox       : parsed,
    content   : marked('```javascript\n' + formatted + '```')// marked(parsed)
};

res.send(views[ 'Dox' ].render(document, views));

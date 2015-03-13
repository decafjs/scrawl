/**
 * Created by mschwartz on 2/28/15.
 */

/*global require, module */

var File = require('File');

module.exports = {
    projectDirectory: new File('/Users/mschwartz/github/decafjs/decaf').exists() ? '/Users/mschwartz/github/decafjs/decaf' : (__dirname + '/' + 'bower_components/decaf')

};

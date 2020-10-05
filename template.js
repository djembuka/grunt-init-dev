/*
 * grunt-init dev
 * For Twin px use only
 *
 * Copyright (c) 2014 Tatiana
 */

'use strict';

// Basic template description.
exports.description = 'Create a development space';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    {
      name: 'domain',
      message: 'Enter project domain',
      default: 'bejet',
      warning: ''
    }
  ], function(err, props) {

    // Files to copy (and process).
    var files = init.filesToCopy();

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });

};

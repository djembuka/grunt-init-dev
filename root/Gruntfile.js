module.exports = function( grunt ) {
  
  grunt.initConfig({
    
    source: 'source/',
    dest: 'dest/',
    temp: 'temp/',
    prod: 'Z:/{%= domain %}/markup/',
    
    jade: {
      dev: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              '**/*.jade',
              '!layouts/**/*.jade',
              '!modules/**/*.jade'
            ],
            dest: '<%= dest%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      },
      
      prod: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true, 
            cwd: './<%= source%>',
            src: [
              '**/*.jade',
              '!layouts/**/*.jade',
              '!modules/**/*.jade'
            ],
            dest: '<%= temp%>',
            ext: '.html',
            extDot: 'first'
          }
        ]
      }
    },
    
    stylus: {
      options: {
        compress: false,
        urlfunc: {
          name: 'embedurl',
          limit: 30000
        }
      },
      template: {
        files: {
          '<%= dest%>template/template_styles.css':
            [
              '<%= source%>styl/template_styles.styl',
              '<%= source%>modules/**/*.styl'
            ]
        }
      },
      components: {
        files: [
          {
            expand: true,
            cwd: '<%= source%>components/',
            src: [ '**/*.styl' ],
            dest: '<%= dest%>components/',
            extDot: 'first',
            ext: '.css'
          }
        ]
      },
      prod: {
        options: {
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= source%>components/',
            src: [ '**/*.styl' ],
            dest: '<%= temp %>components/',
            extDot: 'first',
            ext: '.css'
          },
          {
            '<%= temp %>template/template_styles.css':
              [
                '<%= source%>styl/template_styles.styl',
                '<%= source%>modules/**/*.styl'
              ]
          }
        ]
      }
    },
    
    concat: {
      js: {
        files: {
          '<%= source %>js/jscript.js': [
            '<%= source %>js/src/top.js',
            '<%= source %>js/main.js',
            '<%= source %>modules/**/*.js',
            '<%= source %>js/src/bottom.js',
          ]
        }
      },
      libs: {
        files: {
          '<%= source %>js/jscript.js': [
            '<%= source %>js/jscript.js',
            '<%= source %>js/src/libs/**/*.js',
          ]
        }
      },
      prod: {
        files: {
          '<%= temp %>template/jscript.js': [
            '<%= source %>js/src/top.js',
            '<%= source %>js/main.js',
            '<%= source %>modules/**/*.js',
            '<%= source %>js/src/bottom.js',
          ]
        }
      },
      prodLibs: {
        files: {
          '<%= temp %>js/jscript.js': [
            '<%= temp %>js/jscript.js',
            '<%= source %>js/src/libs/**/*.js',
          ]
        }
      }
    },
    
    jshint: {
      dev: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= source %>js/jscript.js',
            '<%= source %>components/**/*.js'
          ]
        }
      },
      prod: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true,
            console: true
          }
        },
        files: {
          src: [
            '<%= temp %>template/jscript.js',
            '<%= temp %>components/**/*.js'
          ]
        }
      }
    },
    
    uglify: {
      devTemplate: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          preserveComments: 'some'
        },
        files: [
          {
            '<%= dest%>template/jscript.js': '<%= source %>js/jscript.js'
          }
        ]
      },
      devComponents: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= dest%>components/',
            ext: '.js',
            extDot: 'first'
          }
        ]
      },
      prodTemplate: {
        options: {
          mangle: true,
          compress: true,
          preserveComments: 'some'
        },
        files: [
          {
            '<%= temp %>template/jscript.js': '<%= temp %>template/jscript.js'
          }
        ]
      },
      prodComponents: {
        options: {
          mangle: true,
          compress: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: '**/*.js',
            dest: '<%= temp %>components/',
            ext: '.js',
            extDot: 'first'
          }
        ]
      }
    },
    
    clean: {
      js: {
        src: [ '<%= source %>js/jscript.js' ]
      },
      images: {
        src: [ '<%= dest %>template/images/' ]
      },
      temp: {
        src: [ '<%= temp %>' ]
      }
    },
    
    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>images/',
            src: [ '**/*.*' ],
            dest: '<%= dest %>template/images/'
          }
        ]
      },
      upload: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>upload/',
            src: [ '**/*.*' ],
            dest: '<%= dest %>upload/'
          }
        ]
      },
      tempImages: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>images/',
            src: [ '**/*.*' ],
            dest: '<%= temp %>template/images/'
          }
        ]
      },
      tempUpload: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>upload/',
            src: [ '**/*.*' ],
            dest: '<%= temp %>upload/'
          }
        ]
      },
      prodComponents: {
        files: [
          {
            expand: true,
            cwd: '<%= source %>components/',
            src: [ '**/*.js' ],
            dest: '<%= temp %>components/'
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: '<%= temp %>',
            src: [ '**/*.*' ],
            dest: '<%= prod %>'
          }
        ]
      }
    },
    
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [ '**/*' ]
      },
      
      html: {
        files: '**/*.jade',
        tasks: 'jade:dev'
      },
      
      css: {
        files: '<%= source %>**/*.styl',
        tasks: 'css'
      },
      
      js: {
        files: [
          '<%= source %>**/*.js',
          '!<%= source %>js/jscript.js'
        ],
        tasks: [ 'js' ]
      },
      
      img: {
        files: '<%= source %>images/**/*.*',
        tasks: [
          'copy:images'
        ]
      }
    },
    
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= dest%>'
        }
      }
    }
    
  });
  
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-stylus' );
  grunt.loadNpmTasks( 'grunt-contrib-jade' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  
  grunt.registerTask( 'css', [ 'stylus:template', 'stylus:components' ] );
  grunt.registerTask( 'js', [ 'concat:js', 'jshint:dev', 'concat:libs', 'uglify:devTemplate', 'uglify:devComponents', 'clean:js' ] );
  grunt.registerTask( 'html', [ 'copy:images', 'jade:dev' ] );
  grunt.registerTask( 'default', [ 'connect', 'css', 'js', 'html', 'watch' ] );
  
  grunt.registerTask( 'prod', [
    'stylus:prod',
    'jade:prod',
    //js
    'concat:prod',
    'copy:prodComponents',
    'jshint:prod',
    'concat:prodLibs',
    'uglify:prodTemplate',
    'uglify:prodComponents',
    //images
    'clean:images',
    'copy:tempImages',
    'copy:tempUpload',
    //copy
    'copy:prod',
    'clean:temp'
  ]);
  
};
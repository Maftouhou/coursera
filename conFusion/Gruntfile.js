(function(){
    'use strict';

    module.exports = function(grunt){
        //requiring modules

        require('time-grunt')(grunt);

        require('jit-grunt')(grunt, {
            useminPrepare: 'grunt-usemin'
        });

        //Define the configuration for all the tasks
        grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),
            clean: {
                build: {
                    src: ['dist/']
                }
            },
            
            jshint: {
                option: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },

                all: {
                    src: [
                        'Gruntfile.js',
                        'app/scripts/{,*/}*.js'
                    ]
                }
            },
            
            useminPrepare: {
                html: 'app/menu.html',
                options: {
                    dest: 'dist'
                }
            },
            
            concat: {
                option: {
                    separator: ';'
                },
                
                //Dist config remain empty, and will be provided by usemin during runing process
                dist: {}
            },
            
            uglify: {
                dist: {}
            },
            
            cssmin: {
                dist: {}
            },
            
            filerev: {
                options: {
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 20
                },
                release: {
                    // filerev:release hashes(md5) all assets (images, js and css )
                    // in dist directory
                    files: [{
                        src: [
                            'dist/scripts/*.js',
                            'dist/styles/*.css',
                        ]
                    }]
                }
            },
            
            usemin: {
                html: ['dist/*.html'],
                css: ['dist/styles/*.css'],
                options: {
                    assetsDirs: ['dist', 'dist/styles']
                }
            },
            
            copy: {
                dist: {
                    cwd: 'app',
                    src: [ '**','!styles/**/*.css','!scripts/**/*.js' ],
                    dest: 'dist',
                    expand: true
                }, 
                
                fonts: {
                    files: [
                        {
                            //for bootstrap fonts
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/bootstrap/dist',
                            src: ['fonts/*.*'],
                            dest: 'dist'
                        },
                        {
                            //for font-awesome
                            expand: true,
                            dot: true,
                            cwd: 'bower_components/font-awesome',
                            src: ['fonts/*.*'],
                            dest: 'dist'
                        }
                    ]
                }
            },
            
            watch: {
                copy: {
                    files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
                    tasks: [ 'build' ]
                },
                
                scripts: {
                    files: ['app/scripts/app.js'],
                    tasks:[ 'build']
                },
                
                styles: {
                    files: ['app/styles/mystyles.css'],
                    tasks:['build']
                },
                
                livereload: {
                    options: {
                        livereload: '<%= connect.option.livereload %>'
                    },
                    
                    files: [
                        'paa/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        'app/images/{,*/}*.{png, jpg, jpeg, gif, webp, svg}'
                    ]
                }
            },
            
            connect: {
                option: {
                    port: 9000,
                    // Chage this to 0.0.0.0. to access the server outside
                    hostname: 'localhost',
                    lovereload: 35729
                }, 
                
                dist: {
                    option: {
                        open: true,
                        base: {
                            path: 'dist',
                            option: {
                                index: 'menu.html',
                                maxAge: 300000
                            }
                        }
                    }
                }
            }
        });

        //Grunt Build tasks
        grunt.registerTask('build', [
           'clean',
           'jshint',
           'useminPrepare',
           'concat',
           'cssmin',
           'uglify',
           'copy',
           'filerev',
           'usemin'
        ]);
        
        //Grunt Serve task
        grunt.registerTask('serve', [
            'build',
            'connect:dist',
            'watch'
        ]);

        //Grunt Build tasks
        grunt.registerTask('default', [
            'build'
        ]);
    };
})();

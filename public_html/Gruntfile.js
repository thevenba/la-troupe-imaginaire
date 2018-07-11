/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    require('google-closure-compiler').grunt(grunt);
    grunt.loadNpmTasks('grunt-postcss');

    // Project configuration.
    grunt.initConfig({
        'closure-compiler': {
            my_target: {
                files: {
                    'js/main.min.js': ['js/main.js']
                },
                options: {
                    compilation_level: 'SIMPLE',
                    output_wrapper: '%output%',
                    charset: 'UTF-8'
                }
            }
        },
        postcss: {
            options: {
                map: false, // inline sourcemaps 
                processors: [
                    require('autoprefixer')({browsers: 'last 3 versions'}), // add vendor prefixes 
                    require('cssnano')() // minify the result 
                ],
           },
            dist: {
                src: 'css/styles.css',
                dest: 'css/styles.min.css'
            }
        }
    });
};

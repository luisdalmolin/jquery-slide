module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'Gruntfile.js',
                'js/jquery.slide.js'
            ],

            options: {
                jshintrc: '.jshintrc',
            },
        },

        uglify: {
            app: {
                files: {
                    'js/jquery.slide.min.js': ['js/jquery.slide.js']
                }
            }
        },

        watch: {
            js: {
                files: ['js/jquery.slide.js'],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('default', ['jshint', 'uglify', 'watch']);
};

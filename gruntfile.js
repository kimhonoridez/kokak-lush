(function () {
	'use strict';

	module.exports = function(grunt) {

		grunt.initConfig({
			clean: ['dist'],
			copy: {
				html: {
					files: [{expand: true, src: ['app/src/modules/**/*.html', 'app/src/shared/**/*.html'], dest: 'dist/'}]
				},
				js: {
					files: [{expand: true, src: ['app/src/*.js', 'app/src/modules/**/*.js', 'app/src/shared/**/*.js'], dest: 'dist/'}]
				},
				css: {
					files: [{expand: true, src: ['app/css/**/*.*'], dest: 'dist/'}]
				},
				img: {
					files: [{expand: true, src: ['app/img/**/*.*'], dest: 'dist/'}]
				},
				data: {
					files: [{expand: true, src: ['app/src/**/*.json'], dest: 'dist/'}]
				},
				vendor: {
					files: [
						{expand: true, src: ['vendor/**/*'], dest: 'dist/'},
						{expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js', 'angular-csp.css'], dest: 'dist/vendor/'},
						{expand: true, cwd: 'bower_components/jquery/dist/', src: ['*.min.js'], dest: 'dist/vendor/'},
						{expand: true, cwd: 'bower_components/angular-ui-router/release/', src: ['*.min.js'], dest: 'dist/vendor/'},
						{expand: true, cwd: 'bower_components/', src: ['crypto-js/**/*'], dest: 'dist/vendor/'},
						// Bootstrap
						{expand: true, cwd: 'bower_components/bootstrap/dist/', src: ['**/*.min.css', '**/*.min.css.map'], dest: 'dist/vendor/bootstrap/'},
						{expand: true, cwd: 'bower_components/bootstrap/dist/', src: ['js/bootstrap.min.js', 'fonts/**/*'], dest: 'dist/vendor/bootstrap/'}
					]
				},
				others: {
					files: [
						{expand: true, src: ['package.json'], dest: 'dist/'},
						{expand: true, cwd: 'nwjs/', src: ['**/*'], dest: 'dist/'}
					]
				}
			},
			watch: {
				options: {
					livereload: 1337,
					spawn: false
				},
				main: {
					files: 'app/*.html',
					tasks: ['includeSource']
				},
				html: {
					files: 'app/src/**/*.html',
					tasks: ['copy:html']
				},
				js: {
					files: ['app/src/*.js', 'app/src/modules/**/*.js', 'app/src/shared/**/*.js'],
					tasks: ['copy:js', 'includeSource']
				},
				css: {
					files: ['app/css/**/*'],
					tasks: ['copy:css']
				},
				css: {
					files: ['app/src/**/*.json'],
					tasks: ['copy:data']
				}
			},
			includeSource: {
				options: {
					basePath: 'dist/',
					templates: {
						html: {
							js: '<script src="{filePath}"></script>',
							css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
						}
					}
				},
				myTarget: {
				    files: {
				      'dist/index.html': 'app/index.tmpl.html'
				    }
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-include-source');

		grunt.registerTask('build-dev', ['clean', 'copy', 'includeSource', 'watch']);

	};
})();
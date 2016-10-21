module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['**/*.jsx'],
				tasks: ['browserify', 'uglify'],
				options: {
					spawn: false,
				},
			},
			files: 'public/stylesheets/*.less',
			tasks: ['less', 'cssmin']
		},

		less: {
			development: {
				options: {
					paths: ['public/stylesheets/'],
				},
				files: {
					"public/stylesheets/app.css": "public/stylesheets/app.less"
				}
			}
		},

		uglify: {
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'public/dist/app.min.js': ['public/javascripts/app.js']
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'public/dist/app.min.css': ['public/stylesheets/app.css']
				}
			}
		},

		browserify: {
			options: {
				transform: [ [require('grunt-react').browserify , { compact: false }] ]

			},
			app: {
				src: ['react_components/app.jsx'],
				dest: 'public/javascripts/app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['browserify']);
};

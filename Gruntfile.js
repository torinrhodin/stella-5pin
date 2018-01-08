module.exports = function(grunt) {

	// Loads Grunt Tasks
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

	    // Grunt-sass
	    sass: {
	      app: {
	        // Takes every file that ends with .scss from the sass
	        // directory and compile them into the css directory.
	        // Also changes the extension from .scss into .css.
	        // Note: file name that begins with _ are ignored automatically
	        files: [{
	          expand: true,
	          cwd: 'common/code/sass',
	          src: ['*.scss'],
	          dest: 'common/code/css',
	          ext: '.css'
	        }]
	      },
	      options: {
	        sourceMap: true,
	        outputStyle: 'nested',
	        imagePath: "../../",
	      }
	    },

	    // Grunt-contrib-watch
	    watch: {
	      sass: {
	        // Watches all Sass or Scss files within the scss folder and one level down.
	        // If you want to watch all scss files instead, use the "**/*" globbing pattern
	        files: ['common/code/sass/{,*/}*.{scss,sass}'],
	        // runs the task `sass` whenever any watched file changes
	        tasks: ['sass']
	      },
	      options: {
	        // Sets livereload to true for livereload to work
	        // (livereload is not covered in this article)
	        livereload: true,
	        spawn: false
	      }
	    },
	});

	// Default task(s).
	// This registers a task that runs `sass`, followed by `watch`.
	grunt.registerTask('default', ['sass', 'watch']);
}

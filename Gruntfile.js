module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> -' +
            ' <%= pkg.license %> License\n*/\n\n',

    // JSHint JavaScript files
    jshint: {
      files: ['Gruntfile.js',
              'package.json']
    },

    // Compile Sass to CSS -  destination : source
    sass: {
      compile: {
        options: {
          style: 'compact'
        },
        files: {
          'assets/css/compiled_sass.css': 'assets/sass/style.scss'
        },
      },
    },

    // Concatenate all JavaScript & CSS files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';',
      },
      js: {
        src: ['assets/bower_components/bootstrap/dist/js/bootstrap.js'],
        dest: 'assets/js/scripts.js'
      },

      css: {
        src: ['assets/css/compiled_sass.css'],
        dest: 'assets/css/styles.css'
      },
    },

    autoprefixer: {
      options: ['last 2 version'],
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: '{,*/}*.css',
          dest: 'assets/css/'
        }]
      }
    },

    //Minify css
    cssmin: {
      css: {
        src: 'assets/css/styles.css',
        dest:'assets/css/styles.min.css'
      }
    },

    // Minify JavaScript with Uglify
    uglify: {
      options: {
        banner: '<%= banner %>',
        sourceMap: true,
        mangle: false
      },
      dist: {
          files: {
            'assets/js/scripts.min.js': ['<%= concat.js.dest %>']
          }
        }
    },

    /**
     * Compresses Image files
     * Compresses all jpg, png images
     */
    imagemin: {
      build: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets/image_to_compress/',
          src: '**/*.{jpg,jpeg,png}',
          dest: 'assets/images/'
        }]
      }
    },

    /**
     * Compresses SVG files
     */
    svgmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'assets/image_to_compress/',
          src: '**/*.svg',
          dest: 'assets/images/'
        }]
      }
    },

    // Simple config to run sass, jshint and uglify any time a js or sass file is added, modified or deleted
    watch: {
      sass: {
        files: ['assets/sass/{,*/}*.scss'],
        tasks: ['sass']
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      concat: {
        files : ['<%= concat.js.src %>','<%= concat.css.src %>'],
        tasks: ['concat']
      },
      cssmin: {
        files : ['<%= cssmin.css.src %>'],
        tasks: ['cssmin']
      },
      uglify: {
        files: ['assets/js/scripts.js'],
        tasks: ['uglify']
      },
      imagemin: {
        files: ['assets/image_to_compress/{,*/}*.jpg','assets/image_to_compress/{,*/}*.png'],
        tasks: ['imagemin']
      },
      svgmin: {
        files: ['assets/image_to_compress/{,*/}*.svg','assets/image_to_compress/{,*/}*.svg'],
        tasks: ['svgmin']
      },
    },
  });

  // Default tasks
  grunt.registerTask('build',
    [ 'jshint',
      'sass',
      'concat',
      'cssmin',
      'uglify',
      'imagemin',
      'svgmin'
    ]
  );
};

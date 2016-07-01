var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-rename'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del');

//css
gulp.task('css', function(){
	return sass('src/scss/app.scss', {style : 'expanded'})
	.pipe(
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false 
		})
	)
	.pipe(gulp.dest('public/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(cssnano())
	.pipe(gulp.dest('public/css'))
	.pipe(notify({message : 'css task complete'}));
});

//js
gulp.task('js', function(){
	return gulp.src(['src/js/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('app.js'))
	.pipe(gulp.dest('public/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))
	.pipe(notify({message : 'js task complete'}));
});

//img 
gulp.task('img', function(){
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin({optimizationLevel : 3, progressive : true, interlaced : true})))
	.pipe(gulp.dest('public/img'))
	.pipe(notify({ message : 'img task complete'}));
});

//clean 
gulp.task('clean', function(){
	return del(['public/css', 'public/js', 'public/img']);
});

//watch 
gulp.task('watch', function(){
	
	//watch scss files
	gulp.watch('src/scss/**/*.scss', ['css']);

	//watch js files
	gulp.watch('src/js/*.js', ['js']);

	//watch img files
	gulp.watch('src/img/*.*', ['img']);

	//watch views **to be reworked
	// gulp.watch('views/*.pug', ['views']);

	//create LiveReload server
	livereload.listen(35729);

	//watch any files in public/, reload on change
	gulp.watch(['public/**']).on('change', livereload.changed)

});

//build
gulp.task('build', ['watch', 'css', 'img', 'js'], function(){
	notify({message : 'build task complete'});
});



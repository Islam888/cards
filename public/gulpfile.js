var gulp = require('gulp');
//var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
//var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create();

/* gulp.task('scripts', function() {
    return gulp.src('js/*.js')
    .pipe(gulp.dest('js/min.js'));
}); */

gulp.task('styles', function() {
    return gulp.src('sass/**/*.sass')
    .pipe(sass(
        /* {outputStyle: 'compressed'} */
    ).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(gulp.dest('css')); 
});

gulp.task('stylesCompressed', function() {
    return gulp.src('sass/**/*.sass')
    .pipe(sass(
        {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(gulp.dest('css/css.min')); 
});

/* gulp.task('image', function() {
    return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img/build'));
}); */ 

gulp.task('watch', function() {
    //gulp.watch('js/*.js', gulp.series(['scripts']));
    gulp.watch('sass/**/*.sass', gulp.series(['styles']));
    browserSync.init({
		server: './'
    });
    gulp.watch('sass/**/*.sass').on('change', browserSync.reload)
    gulp.watch('*.html').on('change', browserSync.reload)
    gulp.watch('js/**/*.js').on('change', browserSync.reload)
});
gulp.task('default', gulp.series([/* 'scripts', */ 'styles', 'stylesCompressed', 'watch']));
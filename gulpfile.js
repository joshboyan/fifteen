var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-html'),
    imgmin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    panini = require('panini'),
    sitemap = require('gulp-sitemap'),
    replace = require('gulp-replace'),
    browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    child_process = require('child_process');

var jsSources = ['./components/js/*.js']; //may need to dictate specific concatenation order
var sassSources = ['./components/sass/*.scss'];
var htmlSources = ['./components/**/*.html'];

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            //Change address below to load different page with browserSync
            index: "builds/dev/index.html"
        }
    });
});

gulp.task('js', function() {
    return gulp.src(jsSources)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./builds/dev/js'))
});

gulp.task('jsDist', function() {
    return gulp.src(jsSources)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('builds/dist/js'))
});

gulp.task('sass', function() {
    return gulp.src(sassSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(gulp.dest('./builds/dev/css'))

});

gulp.task('sassDist', function() {
    return gulp.src(sassSources)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(gulp.dest('./builds/dist/css'))
});

gulp.task('imgmin', function() {
    return gulp.src('./components/img/**/*.*')
        .pipe(imgmin())
        .pipe(gulp.dest('./builds/dev/img'));
});

gulp.task('imgminDist', function() {
    return gulp.src('./builds/dev/img/**/*.*')
        .pipe(imgmin())
        .pipe(gulp.dest('./builds/dist/img'));
});

gulp.task('startServer', function (cb) {
  child_process.exec('nodemon ./server.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('panini', function() {
    return gulp.src('./components/pages/**/*.html')
        .pipe(panini({
            root: './components/pages/',
            layouts: './components/layouts/',
            partials: './components/partials/',
            helpers: './components/helpers/',
            data: './components/data/'
        }))
        .pipe(replace(/(src="js)/g, 'src ="./builds/dev/js'))
        .pipe(replace(/(href="css)/g, 'href ="./builds/dev/css'))
        .pipe(replace(/(src="img)/g, 'src ="./builds/dev/img'))
        .pipe(gulp.dest('./builds/dev'));
});

gulp.task('paniniDist', function() {
    return gulp.src('./components/pages/**/*.html')
        .pipe(panini({
            root: './components/pages/',
            layouts: './components/layouts/',
            partials: './components/partials/',
            helpers: './components/helpers/',
            data: './components/data/'
        }))
        .pipe(gulp.dest('./builds/dist'));
});

gulp.task('watch', function(done) {
    gulp.watch(['./server.js']).on('change', browserSync.reload);
    gulp.watch(jsSources, ['js']).on('change', browserSync.reload);
    gulp.watch(sassSources, ['sass']).on('change', browserSync.reload);
    gulp.watch(htmlSources, ['panini']).on('change', browserSync.reload);
    gulp.watch(['./components/{layouts,partials,helpers,data}/**/*'], [panini.refresh]);
});

gulp.task('default', ['js', 'sass', 'panini', 'browser-sync', 'imgmin', 'startServer', 'watch']);

gulp.task('dist', ['sassDist', 'jsDist', 'paniniDist', 'imgminDist']);

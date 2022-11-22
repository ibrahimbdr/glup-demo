const { src, dest, series, parallel, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cssclean = require("gulp-clean-css");
const terser = require("gulp-terser");
const image = require("gulp-image");
const browserSync = require("browser-sync");
const useref = require('gulp-useref');

var globs = {
    html: "./*.html",
    css: "./css/**/*.css",
    js: "./js/**/*.js",
    imgs: "./images/*"
}

function htmlT(){
    return src(globs.html)
    .pipe(useref())  
    .pipe(htmlmin({collapseWhitespace:true,removeComments:true})).pipe(dest("dist"));
}

function cssT(){
    return src(globs.css)
    .pipe(cssclean())
    .pipe(dest("dist/sources/"));
}

function jsT(){
    return src(globs.js)
    .pipe(terser())
    .pipe(dest("dist/sources/"));
}

function imgT(){
    return src(globs.imgs)
    .pipe(image())
    .pipe(dest("dist/images/"));
}

function reloadT(done){
    browserSync.reload();
    done();
}

exports.html = htmlT;
exports.css = cssT;
exports.js = jsT;
exports.img = imgT;

function serve (fun){
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    });
    fun();
}

function watchT() {
    watch(globs.html, series(htmlT, reloadT));
    watch(globs.css, series(cssT, reloadT));
    watch(globs.js, series(jsT, reloadT));
    watch(globs.imgs, series(imgT, reloadT));
}

exports.default = series(parallel(htmlT, cssT, jsT, imgT), serve, watchT);

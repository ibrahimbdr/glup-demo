const { src, dest, series, parallel, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-clean-css");
const terser = require("gulp-terser");
// const imagemin = require("gulp-imagemin");
const image = require("gulp-image");
const browserSync = require("browser-sync");
const useref = require('gulp-useref');

const globs = {
    html: "*.html",
    css: "*.css",
    js: "./scripts/*.js",
    img: "./images/*"
}

function htmlMinify(){
    return src(globs.html)
        .pipe(useref())
        .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
        .pipe(dest("dist"))
}

exports.html = htmlMinify;

function cssMinify() {
    return src(globs.css)
    .pipe(cssmin())
    .pipe(dest("dist/sources"));
}

exports.css = cssMinify

function jsMinify() {
    return src(globs.js)
    .pipe(terser())
    .pipe(dest("dist/sources"));
}

exports.js = jsMinify

function imgMinify() {
    return src(globs.img)
    // .pipe(imagemin([
    //     imagemin.mozjpeg({quality: 75, progressive: true})
    // ]))
    .pipe(image())
    .pipe(dest("dist/images"));
}

exports.img = imgMinify

function serve (fun){
    browserSync({
        server: {
            baseDir: 'dist/'
        }
    });
    fun();
}

function reload(done){
    browserSync.reload();
    done();
}

function watchMin() {
    watch(globs.html, series(htmlMinify, reload));
    watch(globs.css, series(cssMinify, reload));
    watch(globs.js, series(jsMinify, reload));
    watch(globs.img, series(imgMinify, reload));
}

exports.default = series(parallel(htmlMinify, cssMinify, jsMinify, imgMinify), serve, watchMin);

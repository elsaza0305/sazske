require('dotenv').config();

const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const mq4 = require('mq4-hover-shim');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const pxtorem = require('postcss-pxtorem');

const pug = require('gulp-pug');

const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const browserSync = require('browser-sync');
const server = browserSync.create();


// Routes
const src = {
	data: './src/assets/data',
	fonts : './src/assets/fonts',
	img : './src/assets/img',
	js : './src/js',
	sass : `./src/${process.env.SASS_EXT}`,
	src : './src',
	views: './src/views',
}

const dist = process.env.PATH_DIST;
// End Routes


// Development Server
gulp.task('server', () => {
	server.init({
		notify: false,
		online: true,
		server: dist,
		tunnel: process.env.PROYECT_TITLE,
		port: process.env.PORT_DEV
	});
});
// End Development Server


// Watching Files Changed
gulp.task('watching', () => {
	gulp.watch(`${src.views}/**/*.pug`, gulp.series('compile-pug'));
	gulp.watch(`${src.sass}/**/*.${process.env.SASS_EXT}`, gulp.series('compile-SASS'));
	gulp.watch(`${src.img}/**/*`, gulp.series('copy-images'));
	gulp.watch(`${src.fonts}/*`, gulp.series('copy-fonts'));
	gulp.watch(`${src.js}/vendor/*.js`, gulp.series('js-vendor'));
	gulp.watch([`${src.js}/modules/*.js`, `${src.js}/app.js`], gulp.series('js-app'));
});
// End Watching Files Changed


// Compile PUG
gulp.task('compile-pug', () => {
    return gulp.src(`${src.views}/pages/*.pug`)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(dist))
        .pipe(server.stream());
});
// End Compile PUG


// Compile SASS
gulp.task('compile-SASS', () => {

	const processors = [
		mq4.postprocessorFor({
			hoverSelectorPrefix: '.is-true-hover '
		}),
		pxtorem({
			propList: ['*'],
			mediaQuery: false,
			replace: false
		}),
		autoprefixer({ overrideBrowserslist: ['last 1 version'] }),
		cssnano()
	];

	return gulp
		.src(`${src.sass}/stylesheet.${process.env.SASS_EXT}`)
		.pipe(maps.init())
		.pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(rename('stylesheet.min.css'))
		.pipe(maps.write('.'))
		.pipe(gulp.dest(`${dist}/assets/css`))
		.pipe(server.stream());

});
// End Compile SASS


// Task JS
gulp.task('js-vendor', () => {
	return gulp.src(`${src.js}/vendor/*.js`)
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});

gulp.task('js-app', () => {
	return gulp.src([`${src.js}/modules/*.js`, `${src.js}/app.js`])
        .pipe(maps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
        .pipe(maps.write('.'))
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});
// End Task JS

// Copy Images
gulp.task('copy-images', () => {
	return gulp
		.src(`${src.img}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/img`))
		.pipe(server.stream());
});
// End Optimize Copy Images


// Copy Fonts
gulp.task('copy-fonts', () => {
	return gulp
		.src(`${src.fonts}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/fonts`))
		.pipe(server.stream());
});
// End Copy Fonts


// Create Dist Folder
gulp.task('development', gulp.series('compile-pug', 'compile-SASS', 'copy-images', 'js-vendor', 'js-app', 'copy-fonts'));


// Start Development
gulp.task('default', gulp.series('development', gulp.parallel('server', 'watching')));

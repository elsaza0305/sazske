/**
 * --------------------------------------------------------------------
 * Yela Create
 * --------------------------------------------------------------------
 */





require('dotenv').config();

const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const mq4 = require('mq4-hover-shim');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');

const pug = require('gulp-pug');

const clean = require('gulp-clean');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const browserSync = require('browser-sync');
const server = browserSync.create();
const tunnel = process.env.TUNNEL_DEV || 'true';





/**
 * Routes
 */
const src = {
	src : `./src`,
	sass : `./src/${process.env.SASS_INPUT}`,
	views: `./src/${process.env.PATH_VIEWS}` || `./src/views`,
	js : `./src/${process.env.PATH_JS}` || `./src/js`,
	data: `./src/${process.env.PATH_DATA}` || `./src/data`,
	img : `./src/${process.env.PATH_IMAGES}` || `./src/assets/images`,
	fonts : `./src/${process.env.PATH_FONTS}` || `./src/assets/fonts`,
	files : `./src/${process.env.PATH_FILES}` || `./src/assets/files`,
	sounds : `./src/${process.env.PATH_SOUNDS}` || `./src/assets/sounds`,
	videos : `./src/${process.env.PATH_VIDEOS}` || `./src/assets/videos`,
}

const dist = `${process.env.PATH_DIST}` || './dist';





/**
 * Run development server
 */
gulp.task('server', () => {
	if (tunnel == 'true') {
		server.init({
			notify: false,
			online: true,
			server: dist,
			tunnel: process.env.PROYECT_TITLE || 'yela-proyect',
			port: process.env.PORT_DEV || 5050
		});
	} else {
		server.init({
			notify: false,
			online: true,
			server: dist,
			port: process.env.PORT_DEV || 5050
		});
	}
});





/**
 * Watching files changed
 */
gulp.task('watching', () => {
	gulp.watch(`${src.views}/**/*.pug`, gulp.series('compile-pug'));
	gulp.watch(`${src.sass}/**/*.${process.env.SASS_INPUT}`, gulp.series('compile-sass'));
	gulp.watch(`${src.js}/vendor/**/*.js`, gulp.series('js-vendor'));
	gulp.watch([`${src.js}/app/modules/**/*.js`, `${src.js}/app/app.js`, `${src.js}/app/functions/**/*.js`], gulp.series('js-app'));
	gulp.watch(`${src.data}/**/*`, gulp.series('copy-data'));
	gulp.watch(`${src.img}/**/*`, gulp.series('copy-images'));	
	gulp.watch(`${src.fonts}/**/*`, gulp.series('copy-fonts'));
	gulp.watch(`${src.files}/**/*`, gulp.series('copy-files'));
	gulp.watch(`${src.sounds}/**/*`, gulp.series('copy-sounds'));
	gulp.watch(`${src.videos}/**/*`, gulp.series('copy-videos'));
});





/**
 * Clean files in folder dist
 */
gulp.task('clean-dist', () => {
	return gulp
		.src(dist, {
			allowEmpty: true
		})
		.pipe(clean({
			force: true
		}));
});





/**
 * Compile Pug
 */
gulp.task('compile-pug', () => {
    return gulp
    	.src(`${src.views}/pages/*.pug`)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(dist))
        .pipe(server.stream());
});





/**
 * Compile Sass
 */
gulp.task('compile-sass', () => {
	const processors = [
		mq4.postprocessorFor({
			hoverSelectorPrefix: '.is-true-hover '
		}),
		pxtorem({
			propList: ['*'],
			mediaQuery: false,
			replace: false
		}),
		autoprefixer({ overrideBrowserslist: ['last 1 version'] })
	];

	return gulp
		.src(`${src.sass}/stylesheet.${process.env.SASS_INPUT}`)
		.pipe(maps.init())
		.pipe(sass.sync({ outputStyle: process.env.SASS_OUTPUT || 'compressed' }).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(rename('stylesheet.css'))
		.pipe(maps.write('.'))
		.pipe(gulp.dest(`${dist}/assets/css`))
		.pipe(server.stream());
});





/**
 * Copy JS vendor
 */
gulp.task('js-vendor', () => {
	return gulp
		.src(`${src.js}/vendor/**/*.js`)
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});





/**
 * Compile JS app
 */
gulp.task('js-app', () => {
	const minified = process.env.JS_MINIFIED || 'yes';

	if (minified == 'no') {
		return gulp
			.src([`${src.js}/app/modules/**/*.js`, `${src.js}/app/app.js`, `${src.js}/app/functions/**/*.js`])
			.pipe(maps.init())
			.pipe(concat('app.js'))
			.pipe(maps.write('.'))
			.pipe(gulp.dest(`${dist}/assets/js`))
			.pipe(server.stream());	
	}

	return gulp
		.src([`${src.js}/app/modules/**/*.js`, `${src.js}/app/app.js`, `${src.js}/app/functions/**/*.js`])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(maps.write('.'))
		.pipe(gulp.dest(`${dist}/assets/js`))
		.pipe(server.stream());
});





/**
 * Copy data
 */
gulp.task('copy-data', () => {
	return gulp
		.src(`${src.data}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/data`))
		.pipe(server.stream());
});





/**
 * Copy images
 */
gulp.task('copy-images', () => {
	return gulp
		.src(`${src.img}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/images`))
		.pipe(server.stream());
});





/**
 * Copy fonts
 */
gulp.task('copy-fonts', () => {
	return gulp
		.src(`${src.fonts}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/fonts`))
		.pipe(server.stream());
});





/**
 * Copy files
 */
gulp.task('copy-files', () => {
	return gulp
		.src(`${src.files}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/files`))
		.pipe(server.stream());
});





/**
 * Copy sounds 
 */
gulp.task('copy-sounds', () => {
	return gulp
		.src(`${src.sounds}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/sounds`))
		.pipe(server.stream());
});





/**
 * Copy videos
 */
gulp.task('copy-videos', () => {
	return gulp
		.src(`${src.videos}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/videos`))
		.pipe(server.stream());
});





/**
 * Create dist folder
 */
gulp.task('development',
	gulp.series(
		'clean-dist',
		'compile-pug',
		'compile-sass',
		'js-vendor',
		'js-app',
		'copy-data',
		'copy-images',
		'copy-fonts',
		'copy-files',
		'copy-sounds',
		'copy-videos'
	)
);


/**
 * Start development
 */
gulp.task('default',
	gulp.series('development',
		gulp.parallel(
			'server',
			'watching'
		)
	)
);
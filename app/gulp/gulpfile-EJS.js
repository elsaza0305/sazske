require('dotenv').config();

const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const mq4 = require('mq4-hover-shim');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const pxtorem = require('postcss-pxtorem');

const ejs = require('gulp-ejs');

const clean = require('gulp-clean');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');

const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

const browserSync = require('browser-sync');
const server = browserSync.create();
const tunnel = process.env.TUNNEL_DEV || 'true';





// Routes
const src = {
	data: `./src/${process.env.PATH_DATA}` || `./src/data`,
	fonts : `./src/${process.env.PATH_FONTS}` || `./src/assets/fonts`,
	files : `./src/${process.env.PATH_FILES}` || `./src/assets/files`,
	img : `./src/${process.env.PATH_IMAGES}` || `./src/assets/images`,
	js : `./src/${process.env.PATH_JS}` || `./src/js`,
	sass : `./src/${process.env.SASS_EXT}`,
	src : `./src`,
	views: `./src/${process.env.PATH_VIEWS}` || `./src/views`,
}

const dist = `${process.env.PATH_DIST}` || './dist';
// END::Routes





// Development Server
gulp.task('server', () => {
	if (tunnel == 'true') {
		server.init({
			notify: false,
			online: true,
			server: dist,
			tunnel: process.env.PROYECT_TITLE || 'sazske-proyect',
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
// END::Development Server





// Watching Files Changed
gulp.task('watching', () => {
	gulp.watch(`${src.views}/**/*.ejs`, gulp.series('compile-ejs'));
	gulp.watch(`${src.sass}/**/*.${process.env.SASS_EXT}`, gulp.series('compile-SASS'));
	gulp.watch(`${src.js}/vendor/**/*.js`, gulp.series('js-vendor'));
	gulp.watch([`${src.js}/modules/**/*.js`, `${src.js}/app.js`, `${src.js}/functions/**/*.js`], gulp.series('js-app'));
	gulp.watch(`${src.data}/*`, gulp.series('copy-data'));
	gulp.watch(`${src.fonts}/*`, gulp.series('copy-fonts'));
	gulp.watch(`${src.files}/*`, gulp.series('copy-files'));
	gulp.watch(`${src.img}/**/*`, gulp.series('copy-images'));
	
});
// END::Watching Files Changed





// Clean Dist
gulp.task('clean-dist', () => {
	return gulp
		.src(dist, {
			allowEmpty: true
		})
		.pipe(clean({
			force: true
		}));
});
// END::Clean Dist





// Compile EJS
gulp.task('compile-ejs', () => {
    return gulp
    	.src(`${src.views}/pages/*.ejs`)
        .pipe(ejs({
            msg: 'Compiling .ejs to .html !!!!'
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest(dist))
        .pipe(server.stream());
});
// END::Compile EJS





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
// END::Compile SASS





// Tasks JS
gulp.task('js-vendor', () => {
	return gulp
		.src(`${src.js}/vendor/**/*.js`)
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});

gulp.task('js-app', () => {
	return gulp
		.src([`${src.js}/modules/**/*.js`, `${src.js}/app.js`, `${src.js}/functions/**/*.js`])
        .pipe(maps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
        .pipe(maps.write('.'))
        .pipe(gulp.dest(`${dist}/assets/js`))
        .pipe(server.stream());
});
// END::Tasks JS





// Copy Data
gulp.task('copy-data', () => {
	return gulp
		.src(`${src.data}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/data`))
		.pipe(server.stream());
});
// END::Copy Data





// Copy Images
gulp.task('copy-images', () => {
	return gulp
		.src(`${src.img}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/img`))
		.pipe(server.stream());
});
// END::Copy Images





// Copy Fonts
gulp.task('copy-fonts', () => {
	return gulp
		.src(`${src.fonts}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/fonts`))
		.pipe(server.stream());
});
// END::Copy Fonts





// Copy Files
gulp.task('copy-files', () => {
	return gulp
		.src(`${src.files}/**/*`)
		.pipe(gulp.dest(`${dist}/assets/files`))
		.pipe(server.stream());
});
// END::Copy Files





// Create Dist Folder
gulp.task('development', gulp.series('clean-dist', 'compile-ejs', 'compile-SASS', 'js-vendor', 'js-app', 'copy-data', 'copy-images', 'copy-fonts', 'copy-files'));


// Start Development
gulp.task('default', gulp.series('development', gulp.parallel('server', 'watching')));
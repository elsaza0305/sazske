'use strict';

const shelljs = require('shelljs');
const validateFolderName = require('./validateFolderName');





const createBigSkeleton = (data) => {

	const { proyect_name, jquery, sass_ext, bootstrap, html_pcs } = data;

	const path__node = `${__dirname}/../node_modules`;
	const path__app = `${__dirname}/../app`;
	const path__proyect = `${process.cwd()}/${proyect_name}`;
	const path__proyect__SASS = (sass_ext === '.sass') ? 'sass' : 'scss';





	/**
	 * Validate folder name
	 */
	const validateFolder = validateFolderName(path__proyect, proyect_name);
	if (!validateFolder) return false;





	/**
	 * Create Folders 
	 */
	shelljs.mkdir('-p', [
		`${path__proyect}/src/assets/images`,
		`${path__proyect}/src/assets/files`,
		`${path__proyect}/src/assets/fonts`,
		`${path__proyect}/src/assets/videos`,
		`${path__proyect}/src/assets/sounds`,
		`${path__proyect}/src/data`,
		`${path__proyect}/src/js/app/functions`,
		`${path__proyect}/src/js/app/modules`,
		`${path__proyect}/src/js/vendor`,
		`${path__proyect}/src/${path__proyect__SASS}/base`,
		`${path__proyect}/src/${path__proyect__SASS}/components`,
		`${path__proyect}/src/${path__proyect__SASS}/extends`,
		`${path__proyect}/src/${path__proyect__SASS}/fonts`,
		`${path__proyect}/src/${path__proyect__SASS}/layout`,
		`${path__proyect}/src/${path__proyect__SASS}/mixins`,
		`${path__proyect}/src/${path__proyect__SASS}/utilities`,
		`${path__proyect}/src/${path__proyect__SASS}/pages`,
		`${path__proyect}/src/${path__proyect__SASS}/variables`,
		`${path__proyect}/src/${path__proyect__SASS}/vendor`,
		`${path__proyect}/src/views`
	]);

	if (html_pcs !== 'none') {
		shelljs.mkdir('-p', [
			`${path__proyect}/src/views/components`,
			`${path__proyect}/src/views/layout`,
			`${path__proyect}/src/views/pages`,
			`${path__proyect}/src/views/partials`,
			`${path__proyect}/src/views/templates`
		]);
	}





	/**
	 * Add JQuery
	 */
	if (jquery === 'yes') {
		// Copy file [ jquery.min.js ]
		shelljs.cp(`${path__node}/jquery/dist/jquery.min.js`, `${path__proyect}/src/js/vendor`);
	}





	/**
	 * Add Bootstrap or Normalize.css
	 */
	if (bootstrap === 'yes') {
		// Copy file [ bootstrap.css ]
		shelljs.cp(`${path__node}/bootstrap/dist/css/bootstrap.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor`);
		// Rename [ bootstrap.css ] -> [ _bootstrap.scss ]
		shelljs.mv(`${path__proyect}/src/${path__proyect__SASS}/vendor/bootstrap.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor/_bootstrap.scss`);
		
		// Create SASS file [ _vendor ]
		shelljs.cp(`${path__app}/sass/_vendor${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);

		// Copy files [ bootstrap.min.js ] and [ jquery.min.js ] 
		shelljs.cp(`${path__node}/bootstrap/dist/js/bootstrap.min.js`, `${path__proyect}/src/js/vendor`);
		shelljs.cp(`${path__node}/jquery/dist/jquery.min.js`, `${path__proyect}/src/js/vendor`);
	}

	if (bootstrap === 'no') {
		// Copy file [ normalize.css ]
		shelljs.cp(`${path__node}/normalize.css/normalize.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor`);
		// Rename [ normalize.css ] -> [ _normalize.scss ]
		shelljs.mv(`${path__proyect}/src/${path__proyect__SASS}/vendor/normalize.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor/_normalize.scss`);

		// Create SASS file [ _vendor-null ]
		shelljs.cp(`${path__app}/sass/_vendor-null${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);
		// Rename [ _vendor-null ] -> [ _vendor ]
		shelljs.mv(`${path__proyect}/src/${path__proyect__SASS}/_vendor-null${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/_vendor${sass_ext}`);
	}





	/**
	 * Create SASS files
	 */
	if (bootstrap === 'yes') {
		shelljs.touch([
			`${path__proyect}/src/${path__proyect__SASS}/_base${sass_ext}`,
			`${path__proyect}/src/${path__proyect__SASS}/_mixins${sass_ext}`,
			`${path__proyect}/src/${path__proyect__SASS}/_utilities${sass_ext}`,
			`${path__proyect}/src/${path__proyect__SASS}/_variables${sass_ext}`
		]);
	}

	if (bootstrap == 'no') {
		shelljs.cp(`${path__app}/sass/base/_global${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/base`);
		shelljs.cp(`${path__app}/sass/mixins/_queries${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/mixins`);
		shelljs.cp(`${path__app}/sass/utilities/_classes${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_display${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_grid${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_opacity${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_positions${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_sizing${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_spacing${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_text${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/utilities/_visibility${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/utilities`);
		shelljs.cp(`${path__app}/sass/variables/_breakpoints${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/variables`);
		shelljs.cp(`${path__app}/sass/variables/_colors${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/variables`);

		shelljs.cp(`${path__app}/sass/_base${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);
		shelljs.cp(`${path__app}/sass/_mixins${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);
		shelljs.cp(`${path__app}/sass/_utilities${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);
		shelljs.cp(`${path__app}/sass/_variables${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);
	}

	shelljs.touch([
		`${path__proyect}/src/${path__proyect__SASS}/_components${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_extends${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_fonts${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_layout${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_pages${sass_ext}`
	]);





	/**
	 * Copy SASS file [ stylesheet ]
	 */
	shelljs.cp(`${path__app}/sass/stylesheet${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);





	/**
	 * Copy JS File
	 */
	shelljs.cp(`${path__app}/js/app.js`, `${path__proyect}/src/js/app`);





	/**
	 * Create Index File
	 */
	if (html_pcs === 'EJS') {
		if (bootstrap === 'yes') {
			shelljs.cp(`${path__app}/pages/ejs/bootstrap/head.ejs`, `${path__proyect}/src/views/partials`);
		} else if (jquery === 'yes') {
			shelljs.cp(`${path__app}/pages/ejs/jquery/head.ejs`, `${path__proyect}/src/views/partials`);
		} else {
			shelljs.cp(`${path__app}/pages/ejs/head.ejs`, `${path__proyect}/src/views/partials`);
		}

		shelljs.cp(`${path__app}/pages/ejs/scripts.ejs`, `${path__proyect}/src/views/partials`);
		shelljs.cp(`${path__app}/pages/ejs/index.ejs`, `${path__proyect}/src/views/pages`);
	}

	if (html_pcs === 'Nunjucks') {
		if (bootstrap === 'yes') {
			shelljs.cp(`${path__app}/pages/njk/bootstrap/default.njk`, `${path__proyect}/src/views/templates`);
		} else if (jquery === 'yes') {
			shelljs.cp(`${path__app}/pages/njk/jquery/default.njk`, `${path__proyect}/src/views/templates`);
		} else {
			shelljs.cp(`${path__app}/pages/njk/default.njk`, `${path__proyect}/src/views/templates`);
		}

		shelljs.cp(`${path__app}/pages/njk/index.njk`, `${path__proyect}/src/views/pages`);
	}

	if (html_pcs === 'Pug') {
		if (bootstrap === 'yes') {
			shelljs.cp(`${path__app}/pages/pug/bootstrap/default.pug`, `${path__proyect}/src/views/templates`);
		} else if (jquery === 'yes') {
			shelljs.cp(`${path__app}/pages/pug/jquery/default.pug`, `${path__proyect}/src/views/templates`);
		} else {
			shelljs.cp(`${path__app}/pages/pug/default.pug`, `${path__proyect}/src/views/templates`);
		}

		shelljs.cp(`${path__app}/pages/pug/index.pug`, `${path__proyect}/src/views/pages`);
	}

	if (html_pcs === 'none') {
		if (bootstrap === 'yes') {
			shelljs.cp(`${path__app}/pages/none/bootstrap/index.html`, `${path__proyect}/src/views`);
		} else if (jquery === 'yes') {
			shelljs.cp(`${path__app}/pages/none/jquery/index.html`, `${path__proyect}/src/views`);
		} else {
			shelljs.cp(`${path__app}/pages/none/index.html`, `${path__proyect}/src/views`);
		}
	}


	


	/**
	 * Add Favicon
	 */
	shelljs.cp(`${path__app}/images/favicon.ico`, `${path__proyect}/src/assets/images`);




	
	/**
	 * Add ENV file
	 */
	shelljs.cp(`${path__app}/env/${sass_ext.substring(1, 5)}.env`, `${path__proyect}`);
	// Rename -> [ .env ]
	shelljs.mv(`${path__proyect}/${sass_ext.substring(1, 5)}.env`, `${path__proyect}/.env`);





	/**
	 * Add Editor Config
	 */
	shelljs.cp(`${path__app}/.editorconfig`, `${path__proyect}`);





	/**
	 * Add README
	 */
	shelljs.cp(`${path__app}/README.md`, `${path__proyect}`);





	/**
	 * Add package.json
	 */
	shelljs.cp(`${path__app}/package/package-${html_pcs}.json`, `${path__proyect}`);
	// Rename -> [ package.json ]
	shelljs.mv(`${path__proyect}/package-${html_pcs}.json`, `${path__proyect}/package.json`);





	/**
	 * Add Gulpfile
	 */
	shelljs.cp(`${path__app}/gulp/gulpfile-${html_pcs}.js`, `${path__proyect}`);
	// Rename -> [ gulpfile.json ]
	shelljs.mv(`${path__proyect}/gulpfile-${html_pcs}.js`, `${path__proyect}/gulpfile.js`);
	




	/**
	 * Add Gitignore
	 */
	shelljs.cp(`${path__app}/gitignore.txt`, `${path__proyect}`);
	// Rename -> [ .gitignore ]
	shelljs.mv(`${path__proyect}/gitignore.txt`, `${path__proyect}/.gitignore`);





	return true;

};





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = createBigSkeleton;
    }
}
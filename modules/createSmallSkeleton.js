'use strict';

const shelljs = require('shelljs');
const validateFolderName = require('./validateFolderName');





const createSmallSkeleton = (data) => {

	const { proyect_name, jquery, bootstrap } = data;

	const path__node = `${__dirname}/../node_modules`;
	const path__app = `${__dirname}/../app`;
	const path__proyect = `${process.cwd()}/${proyect_name}`;
	




	/**
	 * Validate folder name
	 */
	const validateFolder = validateFolderName(path__proyect, proyect_name);
	if (!validateFolder) return false;





	/**
	 *  Create Folders
	 */
	shelljs.mkdir('-p', [
		`${path__proyect}/assets/images`,
		`${path__proyect}/assets/files`,
		`${path__proyect}/assets/fonts`,
		`${path__proyect}/assets/videos`,
		`${path__proyect}/assets/sounds`,
		`${path__proyect}/assets/data`,
		`${path__proyect}/assets/js`,
		`${path__proyect}/assets/css`
	]);





	/**
	 * Add JQuery
	 */
	if (jquery === 'yes') {
		// Copy file [ jquery.min.js ]
		shelljs.cp(`${path__node}/jquery/dist/jquery.min.js`, `${path__proyect}/assets/js`);
	}





	/**
	 * Add Bootstrap or Normalize
	 */
	if (bootstrap === 'yes') {
		// Copy file [ bootstrap.css ]
		shelljs.cp(`${path__node}/bootstrap/dist/css/bootstrap.min.css`, `${path__proyect}/assets/css`);

		// Copy files [ bootstrap.min.js ] and [ jquery.min.js ] 
		shelljs.cp(`${path__node}/bootstrap/dist/js/bootstrap.min.js`, `${path__proyect}/assets/js`);
		shelljs.cp(`${path__node}/jquery/dist/jquery.min.js`, `${path__proyect}/assets/js`);
	}

	if (bootstrap === 'no') {
		// Copy file [ normalize.css ]
		shelljs.cp(`${path__node}/normalize.css/normalize.css`, `${path__proyect}/assets/css`);
	}





	/**
	 * Create JS File
	 */
	shelljs.touch(`${path__proyect}/assets/js/main.js`);





	/**
	 * Create CSS File
	 */
	shelljs.cp(`${path__app}/css/stylesheet.css`, `${path__proyect}/assets/css`);




	
	/**
	 * Create Index File
	 */
	if (bootstrap === 'yes') {
		shelljs.cp(`${path__app}/pages/small/bootstrap/index.html`, path__proyect);
	} else if (jquery === 'yes') {
		shelljs.cp(`${path__app}/pages/small/jquery/index.html`, path__proyect);
	} else {
		shelljs.cp(`${path__app}/pages/small/index.html`, path__proyect);
	}





	/**
	 * Add Editor Config
	 */
	shelljs.cp(`${path__app}/.editorconfig`, `${path__proyect}`);





	/**
	 * Add README
	 */
	shelljs.cp(`${path__app}/README.md`, `${path__proyect}`);





	return true;

};





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = createSmallSkeleton;
    }
}
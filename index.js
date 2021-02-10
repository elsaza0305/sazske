#!/usr/bin/env node

const shelljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const slug = require('slug');




const printHeader = () => {
	console.log(
		'\n' +
		chalk.blueBright(
			figlet.textSync('SAZSKE', {
				font: 'Graffiti',
				horizontalLayout: 'default',
				verticalLayout: 'default'
			})
		) + '\n'
	);
};




const setOptions = () => {
	const questions = [
		{
			name: 'proyect_name',
			type: 'input',
			message: 'Proyect Name:',
			validate: function (val) {
				if (val === '') {
					return false;
				}

				return true;
			}
		},
		{
			name: 'jquery',
			type: 'list',
			message: 'Include JQuery?',
			choices: ['no', 'yes']
		},
		{
			name: 'bootstrap',
			type: 'list',
			message: 'Include Bootstrap?',
			choices: ['no', 'yes']
		},
		{
			name: 'sass_ext',
			type: 'list',
			message: 'Select SASS extension:',
			choices: ['.scss', '.sass']
		},
		{
			name: 'html_pcs',
			type: 'list',
			message: 'Select HTML Preprocessor:',
			choices: ['EJS', 'Handlebars', 'Pug', 'none']
		}
	];

	return inquirer.prompt(questions);
};




const createSkeleton = (data) => {

	const { proyect_name, jquery, sass_ext, bootstrap, html_pcs } = data;

	const path__node = './node_modules';
	const path__app = './app';
	const path__proyect = `${process.cwd()}/${proyect_name}`;
	const path__proyect__SASS = (sass_ext === '.sass') ? 'sass' : 'scss';


	// Validate folder name
	const path__proyectCode = shelljs.find(path__proyect).code;

	if (path__proyectCode === 0) {
		return false;
	} else {
		console.log(
			chalk.gray.italic(`As the folder "${proyect_name}" doesn't exist the project can be created.`)
		);
		console.log(
			'\n' +
			chalk.white.bgMagenta.bold('Wait, please...')
		);
	}

	// Create Folders
	shelljs.mkdir('-p', [
		`${path__proyect}/src/${path__proyect__SASS}/components`,
		`${path__proyect}/src/${path__proyect__SASS}/fonts`,
		`${path__proyect}/src/${path__proyect__SASS}/layout`,
		`${path__proyect}/src/${path__proyect__SASS}/mixins`,
		`${path__proyect}/src/${path__proyect__SASS}/utilities`,
		`${path__proyect}/src/${path__proyect__SASS}/pages`,
		`${path__proyect}/src/${path__proyect__SASS}/variables`,
		`${path__proyect}/src/${path__proyect__SASS}/vendor`,
		`${path__proyect}/src/views`,
		`${path__proyect}/src/js/functions`,
		`${path__proyect}/src/js/modules`,
		`${path__proyect}/src/js/vendor`,
		`${path__proyect}/src/assets/images`,
		`${path__proyect}/src/assets/files`,
		`${path__proyect}/src/assets/fonts`
	]);

	if (html_pcs !== 'none') {
		shelljs.mkdir('-p', [
			`${path__proyect}/src/views/components`,
			`${path__proyect}/src/views/extends`,
			`${path__proyect}/src/views/layout`,
			`${path__proyect}/src/views/pages`,
			`${path__proyect}/src/views/partials`,
		]);
	}





	// Add JQuery
	if (jquery === 'yes') {
		// Copy file [ jquery.min.js ]
		shelljs.cp(`${path__node}/jquery/dist/jquery.min.js`, `${path__proyect}/src/js/vendor`);
	}





	// Add Bootstrap
	if (bootstrap === 'yes') {
		// Copy file [ bootstrap.css ]
		shelljs.cp(`${path__node}/bootstrap/dist/css/bootstrap.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor`);
		// Rename [ bootstrap.css ] -> [ _bootstrap.scss ]
		shelljs.mv(`${path__proyect}/src/${path__proyect__SASS}/vendor/bootstrap.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor/_bootstrap.scss`);
		
		// Create SASS file [ _vendor ]
		shelljs.cp(`${path__app}/sass/_vendor${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);

		// Copy file [ bootstrap.min.js ]
		shelljs.cp(`${path__node}/bootstrap/dist/js/bootstrap.min.js`, `${path__proyect}/src/js/vendor`);
	}

	if (bootstrap === 'no') {
		// Copy file [ normalize.css ]
		shelljs.cp(`${path__node}/normalize.css/normalize.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor`);
		// Rename [ normalize.css ] -> [ _normalize.scss ]
		shelljs.mv(`${path__proyect}/src/${path__proyect__SASS}/vendor/normalize.css`, `${path__proyect}/src/${path__proyect__SASS}/vendor/_normalize.scss`);

		// Copy SASS file [ _vendor-null ]
		shelljs.cp(`${path__app}/sass/_vendor-null${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);
		// Rename [ _vendor-null ] -> [ _vendor ]
		shelljs.mv(`${path__proyect}/src/${path__proyect__SASS}/_vendor-null${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}/_vendor${sass_ext}`);
	}





	// Create SASS files
	shelljs.touch([
		`${path__proyect}/src/${path__proyect__SASS}/_components${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_extends${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_fonts${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_layout${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_mixins${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_utilities${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_pages${sass_ext}`,
		`${path__proyect}/src/${path__proyect__SASS}/_variables${sass_ext}`
	]);

	// Copy SASS file [ stylesheet ]
	shelljs.cp(`${path__app}/sass/stylesheet${sass_ext}`, `${path__proyect}/src/${path__proyect__SASS}`);



	

	// Create Index File
	let html_ext;

	switch (html_pcs) {
		case 'EJS':
			html_ext = '.ejs';
			break;
		case 'Handlebars':
			html_ext = '.hbs';
			break;
		case 'Pug':
			html_ext = '.pug';
			break;
		case 'none':
			html_ext = '.html';
			break;
	}

	if (html_ext !== '.html') {
		shelljs.touch(`${path__proyect}/src/views/pages/index${html_ext}`);
	} else {
		shelljs.touch(`${path__proyect}/src/views/index${html_ext}`);
	}






	// Add Editor Config
	shelljs.cp(`${path__app}/.editorconfig`, `${path__proyect}`);





	// Add README
	shelljs.cp(`${path__app}/README.md`, `${path__proyect}`);





	// Add [ package.json ]
	shelljs.cp(`${path__app}/package.json`, `${path__proyect}`);





	return true;
};





const printFinalMessage = (message, type) => {
	if (type === 'success') {
		console.log(
			'\n' + chalk.white.bgGreen.bold(message)
		);
	} else if (type === 'error') {
		console.log(
			'\n' + chalk.white.bgRed.bold(message)
		);
	} else {
		console.log(
			'\n' + chalk.white.bold(message)
		);
	}
}





const run = async () => {
	printHeader();
	
	const data = await setOptions();
	data.proyect_name = slug(data.proyect_name);

	try {
		const response = await createSkeleton(data);

		if (!response) {
			printFinalMessage(`The folder "${data.proyect_name}" already exists.`, 'error');
			return false;
		}

		printFinalMessage(`The project "${data.proyect_name}" has been created successfully.`, 'success');
	} catch (error) {
		printFinalMessage(error, 'error');
	}
};

run();
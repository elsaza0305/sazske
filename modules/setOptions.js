'use strict';

const inquirer = require('inquirer');






function setInitialOptions() {
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
			name: 'type_proyect',
			type: 'list',
			message: 'Select type proyect:',
			choices: ['big', 'small']
		},
		{
			name: 'bootstrap',
			type: 'list',
			message: 'Include Bootstrap?',
			choices: ['no', 'yes']
		}
	];

	return inquirer.prompt(questions);
};

function setSmallNoBootstrapOptions() {
	const questions = [
		{
			name: 'jquery',
			type: 'list',
			message: 'Include JQuery?',
			choices: ['no', 'yes']
		}
	];

	return inquirer.prompt(questions);
}

function setBigNoBootstrapOptions() {
	const questions = [
		{
			name: 'jquery',
			type: 'list',
			message: 'Include JQuery?',
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
			choices: ['EJS', 'Nunjucks', 'Pug', 'none']
		}
	];

	return inquirer.prompt(questions);
}

function setBigYesBootstrapOptions() {
	const questions = [
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
			choices: ['EJS', 'Nunjucks', 'Pug', 'none']
		}
	];

	return inquirer.prompt(questions);
}





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = { setInitialOptions, setSmallNoBootstrapOptions, setBigNoBootstrapOptions, setBigYesBootstrapOptions };
    }
}
'use strict';

const shelljs = require('shelljs');
const chalk = require('chalk');






function validateFolderName(path__proyect, proyect_name) {
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

		return true;
	}
}





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = validateFolderName;
    }
}
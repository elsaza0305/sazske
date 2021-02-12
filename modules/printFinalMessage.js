'use strict';

const chalk = require('chalk');





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





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = printFinalMessage;
    }
}
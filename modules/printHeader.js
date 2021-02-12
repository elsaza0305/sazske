'use strict';

const chalk = require('chalk');
const figlet = require('figlet');






function printHeader() {
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





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = printHeader;
    }
}
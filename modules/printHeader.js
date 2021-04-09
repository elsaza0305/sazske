'use strict';

const chalk = require('chalk');
const figlet = require('figlet');





const printHeader = () => {
	console.log(
		'\n' +
		chalk.blueBright(
			figlet.textSync('YELA', {
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
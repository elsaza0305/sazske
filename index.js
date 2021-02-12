'use strict';

const slug = require('slug');

const printHeader = require('./modules/printHeader');
const createSkeleton = require('./modules/createSkeleton');
const {setInitialOptions, setSmallNoBootstrapOptions, setBigNoBootstrapOptions, setBigYesBootstrapOptions } = require('./modules/setOptions');





run();

async function run() {
	printHeader();
	
	let data = {};
	data = await setInitialOptions();

	if (data.type_proyect === 'big') {
		if (data.bootstrap === 'yes') {
			let response = await setBigYesBootstrapOptions();
			data = { ...data, ...response, jquery: 'included' };
		} else {
			let response = await setBigNoBootstrapOptions();
			data = { ...data, ...response };
		}
	} 

	if (data.type_proyect === 'small') {
		if (data.bootstrap === 'yes') {
			data = { ...data, jquery: 'included' };
		} else {
			let response = await setSmallNoBootstrapOptions();
			data = { ...data, ...response };
		}
	}
	
	data.proyect_name = slug(data.proyect_name);

	createSkeleton(data);
};
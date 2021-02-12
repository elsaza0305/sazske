'use strict';

const createSmallSkeleton = require('./createSmallSkeleton');
const createBigSkeleton = require('./createBigSkeleton');
const printFinalMessage = require('./printFinalMessage');





async function createSkeleton(data) {
	let response;

	try {
		if (data.type_proyect === 'big') {
			response = await createBigSkeleton(data);
		}

		if (data.type_proyect === 'small') {
			response = await createSmallSkeleton(data);
		}

		if (!response) {
			printFinalMessage(`The folder "${data.proyect_name}" already exists.`, 'error');
			return false;
		}

		printFinalMessage(`The project "${data.proyect_name}" has been created successfully.`, 'success');
	} catch (error) {
		printFinalMessage(error, 'error');
	}
}





if (typeof module !== 'undefined') {
    if (typeof module.exports !== 'undefined') {
        module.exports = createSkeleton;
    }
}
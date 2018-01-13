const moment = require.requireActual('moment'); // instead of import

export default (timestamp = 0) => {
	return moment(timestamp);
};

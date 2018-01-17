export default workItems => {
	return workItems.sort((a, b) => {
		return a.number > b.number ? 1 : -1;
	});
};

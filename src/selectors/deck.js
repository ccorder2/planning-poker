export default deck => {
	return deck.sort((a, b) => {
		return a > b ? 1 : -1;
	});
};

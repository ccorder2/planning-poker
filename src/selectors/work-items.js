export default (games, gameId) => {
	let workItems = [];
	games.some(game => {
		if (game.id === gameId) {
			workItems = game.workItems;
			return true;
		}
	});
	return workItems.sort((a, b) => {
		return a.number > b.number ? 1 : -1;
	});
};

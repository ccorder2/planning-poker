export default (effort, deck) => {
	const avg =
		Object.entries(effort).reduce((sum, value) => sum + value[1], 0) /
		Object.entries(effort).length;
	return deck.find(estimate => estimate >= avg);
};

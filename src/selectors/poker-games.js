import moment from 'moment';

export default (pokerGames, uid) => {
	return pokerGames
		.filter(pokerGame => {
			let arrays = pokerGame.workItems.map(item => {
				if (item.effort) {
					return Object.entries(item.effort).map(uid => {
						return uid[0];
					});
				} else {
					return [];
				}
			});
			return (
				[].concat.apply([], arrays).includes(uid) ||
				(!!pokerGame.players && pokerGame.players.includes(uid)) ||
				(!!pokerGame.spectator && pokerGame.spectator.includes(uid)) ||
				pokerGame.createdBy == uid
			);
		})
		.sort((a, b) => {
			return a.createdOn < b.createdOn ? 1 : -1;
		});
};

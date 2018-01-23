import database from '../firebase/firebase';

// ADD_GAME
export const addGame = game => ({
	type: 'ADD_GAME',
	game
});

export const startAddGame = (gameData = {}) => {
	return (dispatch, getState) => {
		const {
			deck = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40],
			players = [],
			selectedWorkItem = {},
			workItems = []
		} = gameData;

		const game = { deck, players, selectedWorkItem, workItems };

		return database
			.ref(`games`)
			.push(game)
			.then(ref => {
				dispatch(addGame({ id: ref.key, ...game }));
				return ref.key;
			});
	};
};

// JOIN_GAME
export const joinGame = (id, uid) => ({
	type: 'JOIN_GAME',
	id,
	uid
});

export const startJoinGame = id => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;

		return database
			.ref(`games/${id}/players/${uid}`)
			.set(uid)
			.then(ref => {
				dispatch(joinGame(id, uid));
			});
	};
};

// LEAVE_GAME
export const leaveGame = (id, uid) => ({
	type: 'LEAVE_GAME',
	id,
	uid
});

export const startLeaveGame = id => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;

		return database
			.ref(`games/${id}/players/${uid}`)
			.remove()
			.then(ref => {
				dispatch(leaveGame(id, uid));
			});
	};
};

// SET_GAMES
export const setGames = games => ({
	type: 'SET_GAMES',
	games
});

export const startSetGames = () => {
	return (dispatch, getState) => {
		return database
			.ref(`games`)
			.once('value')
			.then(snapshot => {
				const games = [];
				const players = [];

				snapshot.forEach(game => {
					games.push({
						id: game.key,
						...game.val(),
						players: !!game.val().players
							? Object.values(game.val().players)
							: []
					});
				});

				dispatch(setGames(games));
			});
	};
};
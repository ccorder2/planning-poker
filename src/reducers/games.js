import workItemsReducer from './work-items';
import selectedWorkItemReducer from './selected-work-item';

const objectToArray = obj => {
	return !!obj
		? Object.entries(obj).map(item => {
				return {
					id: item[0],
					...item[1]
				};
			})
		: [];
};

// default state
const gamesReducerDefaultState = [];

export default (state = gamesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_GAME':
			return [...state, action.game];
		case 'JOIN_GAME':
			return state.map(game => {
				if (game.id === action.id) {
					return {
						...game,
						players: [
							...game.players.filter(player => player !== action.uid),
							action.uid
						]
					};
				} else {
					return game;
				}
			});
		case 'LEAVE_GAME':
			return state.map(game => {
				if (game.id === action.id) {
					return {
						...game,
						players: game.players.filter(player => player !== action.uid)
					};
				} else {
					return game;
				}
			});
		case 'SET_GAMES':
			const workItems = [];
			return action.games.map(game => ({
				...game,
				workItems: objectToArray(game.workItems)
			}));
		case 'ADD_WORK_ITEM':
		case 'SET_EFFORT':
			return state.map(game => {
				if (game.id === action.gameId) {
					return {
						...game,
						workItems: workItemsReducer(game.workItems, action)
					};
				} else {
					return game;
				}
			});
		case 'CLEAR_ESTIMATES':
		case 'SET_SELECTED_WORK_ITEM':
		case 'SET_ESTIMATE':
		case 'TOGGLE_VISIBILITY':
			return state.map(game => {
				if (game.id === action.gameId) {
					return {
						...game,
						selectedWorkItem: selectedWorkItemReducer(
							game.selectedWorkItem,
							action
						)
					};
				} else {
					return game;
				}
			});
		default:
			return state;
	}
};

// default state
const deckReducerDefaultState = [];

export default (state = deckReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_DECK':
			return action.deck;
		default:
			return state;
	}
};

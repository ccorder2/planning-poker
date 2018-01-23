import gameReducer from './games';

// default state
const workItemsReducerDefaultState = [];

export default (state = workItemsReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_WORK_ITEM':
			return [...state, action.workItem];
		case 'SET_EFFORT':
			return state.map(item => {
				if (item.id === action.wiid) {
					return { ...item, effort: action.effort };
				} else {
					return item;
				}
			});
		default:
			return state;
	}
};

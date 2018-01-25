import gameReducer from './games';

// default state
const workItemsReducerDefaultState = [];

export default (state = workItemsReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_EFFORT':
			return state.map(item => {
				if (item.id === action.wiid) {
					return { ...item, effort: action.effort };
				} else {
					return item;
				}
			});
		case 'UPLOAD_WORK_ITEMS':
			return action.workItems;
		default:
			return state;
	}
};

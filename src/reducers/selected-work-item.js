// default state
const selectedWorkItemReducerDefaultState = {};

export default (state = selectedWorkItemReducerDefaultState, action) => {
	switch (action.type) {
		case 'CLEAR_ESTIMATES':
			return state;
		case 'SET_SELECTED_WORK_ITEM':
			return action.workItem;
		case 'SET_ESTIMATE':
			return state;
		case 'SHOW_CARDS':
			return state;
		case 'TOGGLE_VISIBILITY':
			return state;
		default:
			return state;
	}
};

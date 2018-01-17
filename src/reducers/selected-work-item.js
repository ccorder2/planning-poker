// default state
const selectedWorkItemReducerDefaultState = {};

export default (state = selectedWorkItemReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_SELECTED_WORK_ITEM':
			return action.workItem;
		default:
			return state;
	}
};

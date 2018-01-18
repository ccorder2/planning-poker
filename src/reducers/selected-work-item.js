// default state
const selectedWorkItemReducerDefaultState = {};

export default (state = selectedWorkItemReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_SELECTED_WORK_ITEM':
			return action.workItem;
		case 'SET_ESTIMATE':
			return {
				...state,
				effort: Object.assign(state.effort || {}, {
					[action.uid]: action.estimate
				})
			};
		default:
			return state;
	}
};

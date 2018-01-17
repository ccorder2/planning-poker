// default state
const workItemsReducerDefaultState = [];

export default (state = workItemsReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_WORK_ITEM':
			return [...state, action.workItem];
		case 'SET_EFFORT':
			return state.map(item => {
				if (item.id === action.id) {
					return {
						...item,
						effort: action.effort
					};
				}
			});
		case 'SET_ESTIMATE':
			return state.map(item => {
				if (item.id === action.wiid) {
					return {
						...item,
						effort: Object.assign(item.effort || {}, {
							[action.uid]: action.estimate
						})
					};
				} else {
					return item;
				}
			});
		case 'SET_WORK_ITEMS':
			return action.workItems;
		default:
			return state;
	}
};

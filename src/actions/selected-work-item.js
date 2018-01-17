// SET_SELECTED_WORK_ITEM
export const setSelectedWorkItem = workItem => ({
	type: 'SET_SELECTED_WORK_ITEM',
	workItem
});

export const startSetSelectedWorkItem = id => {
	return (dispatch, getState) => {
		dispatch(
			setSelectedWorkItem(
				getState().workItems.find(item => {
					return item.id === id;
				})
			)
		);
	};
};

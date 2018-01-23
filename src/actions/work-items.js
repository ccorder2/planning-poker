import database from '../firebase/firebase';

// ADD_WORK_ITEM
export const addWorkItem = workItem => ({
	type: 'ADD_WORK_ITEM',
	workItem
});

export const startAddWorkItem = (workItemData = {}) => {
	return (dispatch, getState) => {
		const {
			number = 0,
			title = '',
			description = '',
			effort = {},
			showEffort = { flag: false }
		} = workItemData;

		const workItem = { number, title, description, effort };

		return database
			.ref(`workItems`)
			.push(workItem)
			.then(ref => {
				dispatch(
					addWorkItem({
						id: ref.key,
						...workItem
					})
				);
			});
	};
};

// SET_WORK_ITEMS
export const setWorkItems = workItems => ({
	type: 'SET_WORK_ITEMS',
	workItems
});

export const startSetWorkItems = () => {
	return (dispatch, getState) => {
		return database
			.ref(`workItems`)
			.once('value')
			.then(snapshot => {
				const workItems = [];

				snapshot.forEach(childSnapshot => {
					workItems.push({
						id: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch(setWorkItems(workItems));
			});
	};
};

// SET_EFFORT
export const setEffort = (gameId, wiid, effort) => ({
	type: 'SET_EFFORT',
	gameId,
	wiid,
	effort
});

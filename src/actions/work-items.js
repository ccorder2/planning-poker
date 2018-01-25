import database from '../firebase/firebase';

// SET_EFFORT
export const setEffort = (gameId, wiid, effort) => ({
	type: 'SET_EFFORT',
	gameId,
	wiid,
	effort
});

// UPLOAD_WORK_ITEMS
export const uploadWorkItems = (gameId, workItems) => ({
	type: 'UPLOAD_WORK_ITEMS',
	gameId,
	workItems
});

export const startUploadWorkItems = (gameId, workItems) => {
	return (dispatch, getState) => {
		return database
			.ref(`games/${gameId}/workItems`)
			.set(workItems)
			.then(snap => {
				database
					.ref(`games/${gameId}/workItems`)
					.once('value')
					.then(snapshot => {
						const workItems = [];

						snapshot.forEach(childSnapshot => {
							workItems.push({
								id: childSnapshot.key,
								...childSnapshot.val()
							});
						});

						dispatch(uploadWorkItems(gameId, workItems));
					});
			});
	};
};

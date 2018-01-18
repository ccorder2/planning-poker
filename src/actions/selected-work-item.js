import database from '../firebase/firebase';

// SET_SELECTED_WORK_ITEM
export const setSelectedWorkItem = workItem => ({
	type: 'SET_SELECTED_WORK_ITEM',
	workItem
});

export const startSetSelectedWorkItem = (id = -1) => {
	return (dispatch, getState) => {
		let wi = database.ref(`selectedWorkItem`).once('value');
		if (id !== -1) {
			wi = getState().workItems.find(item => {
				return item.id === id;
			});
			database.ref(`selectedWorkItem`).set(wi);
			return wi;
		} else {
			return database.ref(`selectedWorkItem`).on('value', snapshot => {
				dispatch(
					setSelectedWorkItem({
						...snapshot.val()
					})
				);
			});
		}
	};
};

// SET_ESTIMATE
export const setEstimate = (uid, wiid, estimate) => ({
	type: 'SET_ESTIMATE',
	uid,
	wiid,
	estimate
});

export const startSetEstimate = estimate => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		const wiid = getState().selectedWorkItem.id;
		if (wiid) {
			return database
				.ref(`selectedWorkItem/effort/${uid}`)
				.set(estimate)
				.then(snapshot => {
					dispatch(setEstimate(uid, wiid, estimate));
				});
		}
	};
};

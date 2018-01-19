import database from '../firebase/firebase';

// CLEAR_ESTIMATES
export const clearEstimates = () => ({
	type: 'CLEAR_ESTIMATES'
});

export const startClearEstimates = () => {
	return (dispatch, getState) => {
		return database
			.ref(`selectedWorkItem/effort`)
			.set({})
			.then(snapshot => {
				dispatch(clearEstimates());
			});
	};
};

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
export const setEstimate = (uid, estimate) => ({
	type: 'SET_ESTIMATE',
	uid,
	estimate
});

export const startSetEstimate = estimate => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database
			.ref(`selectedWorkItem/effort/${uid}`)
			.set(estimate)
			.then(snapshot => {
				dispatch(setEstimate(uid, estimate));
			});
	};
};

// TOGGLE_VISIBILITY
export const toggleVisibility = () => ({
	type: 'TOGGLE_VISIBILITY'
});

export const startToggleVisibility = () => {
	return (dispatch, getState) => {
		return database
			.ref(`selectedWorkItem/showEffort/flag`)
			.set(!getState().selectedWorkItem.showEffort.flag)
			.then(snapshot => {
				dispatch(toggleVisibility());
			});
	};
};

import database from '../firebase/firebase';
import { setEffort } from './work-items';

// CLEAR_ESTIMATES
export const clearEstimates = gameId => ({
	type: 'CLEAR_ESTIMATES',
	gameId
});

export const startClearEstimates = gameId => {
	return (dispatch, getState) => {
		return database
			.ref(`games/${gameId}/selectedWorkItem/effort`)
			.set({})
			.then(snapshot => {
				dispatch(clearEstimates(gameId));
			});
	};
};

// SET_SELECTED_WORK_ITEM
export const setSelectedWorkItem = (gameId, workItem) => ({
	type: 'SET_SELECTED_WORK_ITEM',
	gameId,
	workItem
});

export const startSetSelectedWorkItem = (gameId, id = -1) => {
	return (dispatch, getState) => {
		let wi = database.ref(`games/${gameId}/selectedWorkItem`).once('value');
		if (id !== -1) {
			wi = getState()
				.games.find(game => game.id === gameId)
				.workItems.find(item => item.id === id);
			database.ref(`games/${gameId}/selectedWorkItem`).set(wi);
			return wi;
		} else {
			return database
				.ref(`games/${gameId}/selectedWorkItem`)
				.on('value', snapshot => {
					dispatch(
						setSelectedWorkItem(gameId, {
							...snapshot.val()
						})
					);
				});
		}
	};
};

// SET_ESTIMATE
export const setEstimate = (gameId, uid, estimate) => ({
	type: 'SET_ESTIMATE',
	gameId,
	uid,
	estimate
});

export const startSetEstimate = (gameId, estimate) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;

		database
			.ref(`games/${gameId}/selectedWorkItem`)
			.once('value')
			.then(snapshot => {
				const selectedWorkItem = snapshot.val();
				if (selectedWorkItem.showEffort.flag) {
					const effort = { ...selectedWorkItem.effort, [uid]: estimate };
					database
						.ref(
							`games/${gameId}/workItems/${selectedWorkItem.id}/effort/${uid}`
						)
						.set(estimate)
						.then(snapshot => {
							dispatch(setEffort(gameId, selectedWorkItem.id, effort));
						});
				}
			});

		return database
			.ref(`games/${gameId}/selectedWorkItem/effort/${uid}`)
			.set(estimate)
			.then(snapshot => {
				dispatch(setEstimate(gameId, uid, estimate));
			});
	};
};

// TOGGLE_VISIBILITY
export const toggleVisibility = gameId => ({
	type: 'TOGGLE_VISIBILITY',
	gameId
});

export const startToggleVisibility = gameId => {
	return (dispatch, getState) => {
		const selectedWorkItem = getState().games.find(game => game.id === gameId)
			.selectedWorkItem;
		if (!selectedWorkItem.showEffort.flag) {
			database
				.ref(`games/${gameId}/workItems/${selectedWorkItem.id}/effort`)
				.set(selectedWorkItem.effort)
				.then(snapshot => {
					dispatch(
						setEffort(gameId, selectedWorkItem.id, selectedWorkItem.effort)
					);
				});
		}
		return database
			.ref(`games/${gameId}/selectedWorkItem/showEffort/flag`)
			.set(!selectedWorkItem.showEffort.flag)
			.then(snapshot => {
				dispatch(toggleVisibility(gameId));
			});
	};
};

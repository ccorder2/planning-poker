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
			.ref(`games/${gameId}/selectedWorkItem/`)
			.update({ showEffort: false, effort: {} })
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
			return database.ref(`games/${gameId}/selectedWorkItem`).on('value', snapshot => {
				if (!!snapshot.val() && snapshot.val().showEffort) {
					if (!!snapshot.val().effort) {
						database
							.ref(`games/${gameId}/workItems/${snapshot.val().id}/effort`)
							.set(snapshot.val().effort)
							.then(content => {
								dispatch(setEffort(gameId, snapshot.val().id, snapshot.val().effort));
							});
					}
				}
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

		return database
			.ref(`games/${gameId}/selectedWorkItem/effort/${uid}`)
			.set(estimate)
			.then(snapshot => {
				dispatch(setEstimate(gameId, uid, estimate));
			});
	};
};

// SHOW_CARDS
export const showCards = gameId => ({
	type: 'SHOW_CARDS',
	gameId
});

export const startShowCards = gameId => {
	return (dispatch, getState) => {
		const selectedWorkItem = getState().games.find(game => game.id === gameId).selectedWorkItem;

		return database
			.ref(`games/${gameId}/selectedWorkItem/showEffort`)
			.set(true)
			.then(snapshot => {
				dispatch(showCards(gameId));
			});
	};
};

/*
 * !!!DEPRECATED!!!
 * not used anymore
 */
// TOGGLE_VISIBILITY
export const toggleVisibility = gameId => ({
	type: 'TOGGLE_VISIBILITY',
	gameId
});

export const startToggleVisibility = gameId => {
	return (dispatch, getState) => {
		const selectedWorkItem = getState().games.find(game => game.id === gameId).selectedWorkItem;

		return database
			.ref(`games/${gameId}/selectedWorkItem/showEffort`)
			.set(!selectedWorkItem.showEffort)
			.then(snapshot => {
				dispatch(toggleVisibility(gameId));
			});
	};
};

import database from '../firebase/firebase';
import {
	startSetSelectedWorkItem,
	setSelectedWorkItem
} from './selected-work-item';

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
			effort = {}
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

// SET_EFFORT
// export const setEffort = (id, effort) => ({
// 	type: 'SET_EFFORT',
// 	id,
// 	effort
// });

// export const startSetEffort = (id, effort) => {
// 	return (dispatch, getState) => {
// 		return database
// 			.ref(`workItems/${id}`)
// 			.update({ effort })
// 			.then(ref => {
// 				dispatch(setEffort(id, effort));
// 			});
// 	};
// };

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
				.ref(`workItems/${wiid}/effort/${uid}`)
				.set(estimate)
				.then(snapshot => {
					dispatch(setEstimate(uid, wiid, estimate));
					dispatch(startSetWorkItems());
				});
		}
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

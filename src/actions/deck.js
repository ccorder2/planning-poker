import database from '../firebase/firebase';

// SET_SELECTED_WORK_ITEM
export const setDeck = deck => ({
	type: 'SET_DECK',
	deck
});

export const startSetDeck = () => {
	return (dispatch, getState) => {
		return database
			.ref(`deck`)
			.once('value')
			.then(snapshot => {
				const deck = [];

				snapshot.forEach(childSnapshot => {
					deck.push(childSnapshot.val());
				});

				dispatch(setDeck(deck));
			});
	};
};

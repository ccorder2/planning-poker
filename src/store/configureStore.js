import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import deckReducer from '../reducers/deck';
import selectedWorkItemReducer from '../reducers/selected-work-item';
import workItemsReducer from '../reducers/work-items';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			workItems: workItemsReducer,
			selectedWorkItem: selectedWorkItemReducer,
			deck: deckReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};

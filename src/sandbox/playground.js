import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './../store/configureStore';
import { firebase } from './../firebase/firebase';
import {
	startAddGame,
	startJoinGame,
	startLeaveGame
} from './../actions/games';

const store = configureStore();

store.dispatch(startLeaveGame('-L3KSkCkmb0BwEsD7WiG'));

const jsx = <div>stuff</div>;

ReactDOM.render(jsx, document.getElementById('app'));

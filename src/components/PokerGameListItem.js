import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PokerGameListItem = ({ id, createdOn }) => (
	<Link className="list-item" to={`/game/${id}`}>
		<div>
			<h3 className="list-item__title">
				Poker Game on {moment(createdOn).format('MMMM Do, YYYY')}
			</h3>
		</div>
	</Link>
);

export default PokerGameListItem;

import React from 'react';
import WorkItemList from './WorkItemList';
import PokerBoardHeader from './PokerBoardHeader';
import Deck from './Deck';

const PokerGame = () => (
	<div>
		<div>
			<PokerBoardHeader />
			<Deck />
		</div>

		<div>
			<WorkItemList />
		</div>
	</div>
);

export default PokerGame;

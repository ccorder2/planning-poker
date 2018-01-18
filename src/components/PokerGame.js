import React from 'react';
import WorkItemList from './WorkItemList';
import PokerBoardHeader from './PokerBoardHeader';
import Deck from './Deck';
import PokerBoard from './PokerBoard';

const PokerGame = () => (
	<div>
		<div>
			<PokerBoardHeader />
			<PokerBoard />
			<Deck />
		</div>

		<div>
			<WorkItemList />
		</div>
	</div>
);

export default PokerGame;

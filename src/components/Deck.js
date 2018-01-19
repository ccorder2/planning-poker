import React from 'react';
import { connect } from 'react-redux';
import selectDeck from './../selectors/deck';
import PokerCard from './../components/PokerCard';

export const Deck = props => (
	<div className="game-layout__estimates--deck">
		{props.deck.map(card => (
			<PokerCard key={card} card={card} isVisibile={true} />
		))}
	</div>
);

const mapStateToProps = state => ({
	deck: selectDeck(state.deck)
});

export default connect(mapStateToProps)(Deck);

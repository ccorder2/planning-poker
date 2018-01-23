import React from 'react';
import { connect } from 'react-redux';
import selectDeck from './../selectors/deck';
import PokerCard from './../components/PokerCard';

export const Deck = props => (
	<div className="game-layout__estimates--deck">
		{props.deck.map(card => (
			<PokerCard
				key={card}
				gameId={props.gameId}
				card={card}
				isVisible={true}
				allowClick={true}
			/>
		))}
	</div>
);

const mapStateToProps = (state, props) => ({
	deck: selectDeck(state.games.find(game => game.id === props.gameId).deck)
});

export default connect(mapStateToProps)(Deck);

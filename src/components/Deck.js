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
				allowClick={props.allowClick}
			/>
		))}
	</div>
);

const mapStateToProps = (state, props) => ({
	deck: selectDeck(state.games.find(game => game.id === props.gameId).deck),
	allowClick:
		!!state.games.find(game => game.id === props.gameId).selectedWorkItem &&
		!!state.games.find(game => game.id === props.gameId).selectedWorkItem.id &&
		!!state.games.find(game => game.id === props.gameId).players &&
		state.games.find(game => game.id === props.gameId).players.includes(state.auth.uid)
});

export default connect(mapStateToProps)(Deck);

import React from 'react';
import { connect } from 'react-redux';
import selectDeck from './../selectors/deck';
import PokerCard from './../components/PokerCard';

export const Deck = props => (
	<div>{props.deck.map(card => <PokerCard key={card} card={card} />)}</div>
);

const mapStateToProps = state => ({
	deck: selectDeck(state.deck)
});

export default connect(mapStateToProps)(Deck);

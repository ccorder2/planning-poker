import React from 'react';
import { connect } from 'react-redux';
import PokerGameListItem from './PokerGameListItem';
import selectPokerGames from '../selectors/poker-games';
import moment from 'moment';

export const PokerGameList = props => (
	<div className="content-container">
		<div className="list-header-main">
			<div>Your Games</div>
		</div>
		<div className="list-body-main">
			{props.pokerGames.length === 0 ? (
				<div className="list-item list-item--message">
					<span>No games</span>
				</div>
			) : (
				props.pokerGames.map(pokerGame => {
					return <PokerGameListItem key={pokerGame.id} {...pokerGame} />;
				})
			)}
		</div>
	</div>
);

const mapStateToProps = state => {
	return {
		pokerGames: selectPokerGames(state.games, state.auth.uid)
	};
};

export default connect(mapStateToProps)(PokerGameList);

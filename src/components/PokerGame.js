import React from 'react';
import { connect } from 'react-redux';
import Deck from './Deck';
import PokerBoard from './PokerBoard';
import PokerBoardHeader from './PokerBoardHeader';
import WorkItemList from './WorkItemList';
import { startJoinGame } from '../actions/games';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';

export class PokerGame extends React.Component {
	componentDidMount = () => {
		if (!this.props.isSpectator) {
			this.props.startJoinGame(this.props.game.id);
		}
		this.props.startSetSelectedWorkItem(this.props.game.id);
	};
	render() {
		return (
			<div className="content-container game-layout">
				<div className="game-layout__board">
					<PokerBoardHeader gameId={this.props.game.id} />
					<PokerBoard gameId={this.props.game.id} />
					<Deck gameId={this.props.game.id} />
				</div>

				<div>
					<WorkItemList gameId={this.props.game.id} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	game: state.games.find(({ id }) => id === props.match.params.id),
	isSpectator:
		!!state.games.find(({ id }) => id === props.match.params.id).spectators &&
		state.games.find(({ id }) => id === props.match.params.id).spectators.includes(state.auth.uid)
});

const mapDispatchToProps = dispatch => ({
	startJoinGame: id => dispatch(startJoinGame(id)),
	startSetSelectedWorkItem: id => dispatch(startSetSelectedWorkItem(id, -1))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerGame);

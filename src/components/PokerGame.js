import React from 'react';
import { connect } from 'react-redux';
import Deck from './Deck';
import PokerBoard from './PokerBoard';
import PokerBoardHeader from './PokerBoardHeader';
import WorkItemList from './WorkItemList';
import {
	startJoinGame,
	startLeaveGame,
	startRemoveSpectator,
	startUpdatePlayers
} from '../actions/games';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';

export class PokerGame extends React.Component {
	componentDidMount = () => {
		this.props.startUpdatePlayers(this.props.game.id);
		if (!this.props.isSpectator) {
			this.props.startJoinGame(this.props.game.id);
		}
		this.props.startSetSelectedWorkItem(this.props.game.id);
		localStorage.instances
			? localStorage.setItem('instances', parseInt(localStorage.instances) + 1)
			: localStorage.setItem('instances', 1);
		window.addEventListener('beforeunload', this.leaveGame);
	};
	componentWillUnmount = () => {
		this.leaveGame();
		window.removeEventListener('beforeunload', this.leaveGame);
	};
	leaveGame = () => {
		localStorage.instances = parseInt(localStorage.instances) - 1;
		if (localStorage.instances === '0') {
			this.props.startLeaveGame(this.props.game.id);
			this.props.startRemoveSpectator(this.props.game.id);
		}
	};
	getNames = type => {
		let str = '';
		let people = type === 'players' ? this.props.game.players : this.props.game.spectators;
		if (people && people.length > 0) {
			for (let i = 0; i < people.length; i++) {
				str += Object.values(people[i])[0];
				if (i !== people.length - 1) {
					str += '\n';
				}
			}
		} else {
			str += '(none)';
		}
		return str;
	};
	render() {
		return (
			<div className="content-container game-layout">
				<div className="game-layout__board">
					<PokerBoardHeader gameId={this.props.game.id} />
					<PokerBoard gameId={this.props.game.id} />
					<Deck gameId={this.props.game.id} />
					<div>
						<span title={this.getNames('players')}>Players: {this.props.game.players.length}</span>,{' '}
						<span title={this.getNames('spectators')}>
							Spectators: {this.props.game.spectators.length}
						</span>
					</div>
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
		state.games
			.find(({ id }) => id === props.match.params.id)
			.spectators.some(spectator => spectator[state.auth.uid])
});

const mapDispatchToProps = dispatch => ({
	startUpdatePlayers: id => dispatch(startUpdatePlayers(id)),
	startJoinGame: id => dispatch(startJoinGame(id)),
	startLeaveGame: id => dispatch(startLeaveGame(id)),
	startRemoveSpectator: id => dispatch(startRemoveSpectator(id)),
	startSetSelectedWorkItem: id => dispatch(startSetSelectedWorkItem(id, -1))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerGame);

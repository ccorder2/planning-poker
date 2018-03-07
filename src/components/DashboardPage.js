import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startAddGame, startIsGameId } from '../actions/games';
import PokerGameList from './PokerGameList';

export class DashboardPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			gameId: '',
			isDisabled: true
		};
	}
	onClickAddGame = () => {
		this.props.startAddGame().then(snapshot => {
			this.props.history.push('/game/' + snapshot);
		});
	};
	onGameIdChange = e => {
		const gameId = e.target.value;
		const isDisabled = this.props.games.findIndex(game => game.id === gameId) === -1;
		this.setState(() => ({ gameId, isDisabled }));
	};
	onClickJoinGame = () => {
		this.props.history.push('/game/' + this.state.gameId);
	};
	render() {
		return (
			<div className="content-container">
				<div className="page-header__title">
					<span>Welcome {this.props.displayName}!</span>
				</div>
				<div className="page-header__actions">
					<div className="content-container">
						<div className="page-header__actions-title">
							<h2>Planning Poker Dashboard</h2>
						</div>
						<div className="page-header__action-items">
							<div>
								<button className="btn" onClick={this.onClickAddGame}>
									Create New Game
								</button>
							</div>
							<div>
								<input
									type="text"
									placeholder="Game ID"
									className="text-input"
									maxLength={20}
									value={this.state.gameId}
									onChange={this.onGameIdChange}
								/>
								<button
									disabled={this.state.isDisabled}
									className="btn"
									onClick={this.onClickJoinGame}
								>
									Join Game
								</button>
							</div>
						</div>
					</div>
					<PokerGameList />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	displayName: state.auth.displayName,
	games: state.games
});

const mapDispatchToProps = dispatch => ({
	startAddGame: () => dispatch(startAddGame()),
	startIsGameId: id => dispatch(startIsGameId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

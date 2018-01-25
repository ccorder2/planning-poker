import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startAddGame, startIsGameId } from '../actions/games';

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
		const isDisabled =
			this.props.games.findIndex(game => game.id === gameId) === -1;
		this.setState(() => ({ gameId, isDisabled }));
	};
	onClickJoinGame = () => {
		this.props.history.push('/game/' + this.state.gameId);
	};
	render() {
		return (
			<div className="content-container">
				<div className="page-header__title">
					<span>Welcome to Planning Poker</span>
					<br /> An agile estimating tool
				</div>
				<hr />
				<h3>Use the following actions to get started...</h3>
				<div className="page-header__actions">
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
		);
	}
}

const mapStateToProps = state => ({
	games: state.games
});

const mapDispatchToProps = dispatch => ({
	startAddGame: () => dispatch(startAddGame()),
	startIsGameId: id => dispatch(startIsGameId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

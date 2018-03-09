import React from 'react';
import { connect } from 'react-redux';
import { startSetEstimate, startShowCards } from '../actions/selected-work-item';

export class PokerCard extends React.Component {
	onClick = () => {
		if (this.props.allowClick) {
			this.props.startSetEstimate(this.props.card).then(() => {
				if (this.props.allPlayersSelected && this.props.isVisible) {
					this.props.startShowCards();
				}
			});
		}
	};
	render() {
		return (
			<div
				className={this.props.isSelected && this.props.allowClick ? 'card card--selected' : 'card'}
			>
				{this.props.isVisible ? (
					<div className="card--show" key={this.props.card} onClick={this.onClick}>
						<span className="card-top">{this.props.card}</span>
						<span className="card-main">{this.props.card}</span>
					</div>
				) : (
					<div className="card--back" />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	let game = state.games.find(game => game.id === props.gameId);
	return {
		isSelected:
			!!game.selectedWorkItem && !!game.selectedWorkItem.effort
				? game.selectedWorkItem.effort[state.auth.uid] === props.card
				: false,
		allPlayersSelected:
			!!game.selectedWorkItem &&
			!!game.selectedWorkItem.effort &&
			!!game.players &&
			game.players.length === Object.entries(game.selectedWorkItem.effort).length &&
			!game.selectedWorkItem.showEffort
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	startSetEstimate: data => dispatch(startSetEstimate(props.gameId, data)),
	startShowCards: () => dispatch(startShowCards(props.gameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerCard);

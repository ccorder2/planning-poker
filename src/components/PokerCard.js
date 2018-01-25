import React from 'react';
import { connect } from 'react-redux';
import { startSetEstimate } from '../actions/selected-work-item';

export class PokerCard extends React.Component {
	onClick = () => {
		if (this.props.allowClick) {
			this.props.startSetEstimate(this.props.card);
		}
	};
	render() {
		return (
			<div
				className={
					this.props.isSelected && this.props.allowClick
						? 'card card--selected'
						: 'card'
				}
			>
				{this.props.isVisible ? (
					<div
						className="card--show"
						key={this.props.card}
						onClick={this.onClick}
					>
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
	let item = state.games.find(game => game.id === props.gameId)
		.selectedWorkItem;
	return {
		isSelected:
			!!item && !!item.effort
				? state.games.find(game => game.id === props.gameId).selectedWorkItem
						.effort[state.auth.uid] === props.card
				: false
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	startSetEstimate: data => dispatch(startSetEstimate(props.gameId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerCard);

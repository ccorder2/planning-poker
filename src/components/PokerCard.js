import React from 'react';
import { connect } from 'react-redux';
import { startSetEstimate } from '../actions/selected-work-item';

export class PokerCard extends React.Component {
	onClick = () => {
		this.props.startSetEstimate(this.props.card);
	};
	render() {
		return (
			<div className="card">
				{this.props.isVisibile ? (
					<div
						className="card--show"
						key={this.props.card}
						onClick={this.onClick}
					>
						<span className="card-top">{this.props.card}</span>
						<span className="card-main">{this.props.card}</span>
					</div>
				) : (
					<div>back of card</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startSetEstimate: data => dispatch(startSetEstimate(data))
});

export default connect(undefined, mapDispatchToProps)(PokerCard);

import React from 'react';
import { connect } from 'react-redux';
import { startSetEstimate } from '../actions/selected-work-item';

export class PokerCard extends React.Component {
	onClick = () => {
		this.props.startSetEstimate(this.props.card);
	};
	render() {
		return (
			<div key={this.props.card} onClick={this.onClick}>
				<span>{this.props.card}</span>
				<span>{this.props.card}</span>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startSetEstimate: data => dispatch(startSetEstimate(data))
});

export default connect(undefined, mapDispatchToProps)(PokerCard);

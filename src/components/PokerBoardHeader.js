import React from 'react';
import { connect } from 'react-redux';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';

export class PokerBoardHeader extends React.Component {
	render() {
		return (
			<div>
				{!!this.props.selectedWorkItem.id ? (
					<div className="list-item">
						<h3>
							{this.props.selectedWorkItem.number} -{' '}
							{this.props.selectedWorkItem.title}
						</h3>
					</div>
				) : (
					<div className="list-item list-item--message">
						No selected work item
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	selectedWorkItem: state.games.find(game => game.id === props.gameId)
		.selectedWorkItem
});

export default connect(mapStateToProps)(PokerBoardHeader);

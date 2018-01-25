import React from 'react';
import { connect } from 'react-redux';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';
import calculateEffort from '../selectors/work-item-effort';

export class WorkItemListItem extends React.Component {
	onClick = () => {
		this.props.startSetSelectedWorkItem(this.props.id);
	};
	render() {
		return (
			<div className="list-item" onClick={this.onClick}>
				<div>
					{this.props.number} - {this.props.title}
				</div>
				<div className="list-item__data">
					{!!this.props.effort
						? calculateEffort(this.props.effort, this.props.deck)
						: '_'}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startSetSelectedWorkItem: data =>
		dispatch(startSetSelectedWorkItem(props.gameId, data))
});

export default connect(undefined, mapDispatchToProps)(WorkItemListItem);

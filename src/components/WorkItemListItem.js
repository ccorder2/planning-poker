import React from 'react';
import { connect } from 'react-redux';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';

export class WorkItemListItem extends React.Component {
	onClick = () => {
		this.props.startSetSelectedWorkItem(this.props.id);
	};
	render() {
		return (
			<div onClick={this.onClick}>
				<div>
					{this.props.number} - {this.props.title}
				</div>
				<div>
					{!!this.props.effort
						? Object.entries(this.props.effort).reduce(
								(sum, value) => sum + value[1],
								0
							) / Object.entries(this.props.effort).length
						: '_'}
				</div>
				<div>{this.props.description}</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startSetSelectedWorkItem: data => dispatch(startSetSelectedWorkItem(data))
});

export default connect(undefined, mapDispatchToProps)(WorkItemListItem);

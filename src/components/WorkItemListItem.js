import React from 'react';
import { connect } from 'react-redux';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';

export class WorkItemListItem extends React.Component {
	onClick = () => {
		this.props.startSetSelectedWorkItem(this.props.id);
	};
	render() {
		return (
			<div className="list-item" onClick={this.onClick}>
				<div>
					<h4>
						{this.props.number} - {this.props.title}
					</h4>
					<span className="list-item__subtitle">{this.props.description}</span>
				</div>
				<h4 className="list-item__data">
					{!!this.props.effort
						? Object.entries(this.props.effort).reduce(
								(sum, value) => sum + value[1],
								0
							) / Object.entries(this.props.effort).length
						: '_'}
				</h4>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startSetSelectedWorkItem: data => dispatch(startSetSelectedWorkItem(data))
});

export default connect(undefined, mapDispatchToProps)(WorkItemListItem);

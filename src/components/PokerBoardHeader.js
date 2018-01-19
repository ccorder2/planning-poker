import React from 'react';
import { connect } from 'react-redux';
import { startSetSelectedWorkItem } from '../actions/selected-work-item';

export class PokerBoardHeader extends React.Component {
	componentDidMount = () => {
		this.props.startSetSelectedWorkItem(this.props.selectedWorkItem.id);
	};
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

// export const PokerBoardHeader = props => (
// 	<div>
// 		{!!props.selectedWorkItem.id ? (
// 			<div>
// 				<div>
// 					{props.selectedWorkItem.number}
// 					-
// 					{props.selectedWorkItem.title}
// 				</div>
// 				<div>{props.selectedWorkItem.description}</div>
// 			</div>
// 		) : (
// 			<div>No selected work item</div>
// 		)}
// 	</div>
// );

const mapStateToProps = state => ({
	selectedWorkItem: state.selectedWorkItem
});

const mapDispatchToProps = (dispatch, props) => ({
	startSetSelectedWorkItem: data => dispatch(startSetSelectedWorkItem(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerBoardHeader);

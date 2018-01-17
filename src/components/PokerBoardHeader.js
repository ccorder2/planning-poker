import React from 'react';
import { connect } from 'react-redux';

export const PokerBoardHeader = props => {
	return (
		<div>
			{!!props.selectedWorkItem.id ? (
				<div>
					<div>
						{props.selectedWorkItem.number}
						-
						{props.selectedWorkItem.title}
					</div>
					<div>{props.selectedWorkItem.description}</div>
				</div>
			) : (
				<div>No selected work item</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		selectedWorkItem: state.selectedWorkItem
	};
};

export default connect(mapStateToProps)(PokerBoardHeader);

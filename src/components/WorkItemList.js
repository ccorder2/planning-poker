import React from 'react';
import { connect } from 'react-redux';
import WorkItemListItem from './WorkItemListItem';
import selectWorkItems from './../selectors/work-items';

export const WorkItemList = props => (
	<div>
		<div className="list-header">
			<div>Work Item</div>
			<div>Effort</div>
		</div>
		<div className="list-body">
			{props.workItems.length === 0 ? (
				<div className="list-item list-item--message">
					<span>No work items</span>
				</div>
			) : (
				props.workItems.map(item => (
					<WorkItemListItem
						key={item.id}
						gameId={props.gameId}
						deck={props.deck}
						{...item}
					/>
				))
			)}
		</div>
	</div>
);

const mapStateToProps = (state, props) => {
	return {
		workItems: selectWorkItems(state.games, props.gameId),
		deck: state.games.find(game => game.id === props.gameId).deck
	};
};

export default connect(mapStateToProps)(WorkItemList);

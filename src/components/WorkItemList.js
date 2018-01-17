import React from 'react';
import { connect } from 'react-redux';
import WorkItemListItem from './WorkItemListItem';
import selectWorkItems from './../selectors/work-items';

export const WorkItemList = props => (
	<div>
		<div>
			<div>Work Item</div>
			<div>Effort</div>
		</div>
		{props.workItems.length === 0 ? (
			<div>
				<span>No expenses </span>
			</div>
		) : (
			props.workItems.map(item => <WorkItemListItem key={item.id} {...item} />)
		)}
	</div>
);

const mapStateToProps = state => {
	return {
		workItems: selectWorkItems(state.workItems)
	};
};

export default connect(mapStateToProps)(WorkItemList);

import React from 'react';
import { connect } from 'react-redux';
import PokerCard from './PokerCard';

export const PokerBoard = props => (
	<div>
		<div>
			<button>Flip Cards</button>
			<button>Clear</button>
		</div>
		<div>
			{!!props.selectedWorkItem.effort &&
				Object.entries(props.selectedWorkItem.effort).map(estimate => {
					return <PokerCard key={estimate[1]} card={estimate[1]} />;
				})}
		</div>
	</div>
);

const mapStateToProps = state => ({
	selectedWorkItem: state.selectedWorkItem
});

export default connect(mapStateToProps)(PokerBoard);

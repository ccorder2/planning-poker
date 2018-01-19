import React from 'react';
import { connect } from 'react-redux';
import PokerCard from './PokerCard';
import {
	startClearEstimates,
	startToggleVisibility
} from '../actions/selected-work-item';

export const PokerBoard = props => (
	<div>
		<div className="game-layout__actions">
			<button className="btn" onClick={props.startToggleVisibility}>
				Flip Cards
			</button>
			<button className="btn" onClick={props.startClearEstimates}>
				Clear
			</button>
		</div>
		<div className="game-layout__estimates">
			{!!props.selectedWorkItem.effort &&
				Object.entries(props.selectedWorkItem.effort).map((estimate, index) => {
					return (
						<PokerCard
							key={index}
							card={estimate[1]}
							isVisibile={props.selectedWorkItem.showEffort.flag}
						/>
					);
				})}
		</div>
	</div>
);

const mapStateToProps = state => ({
	selectedWorkItem: state.selectedWorkItem
});

const mapDispatchToProps = dispatch => ({
	startToggleVisibility: () => dispatch(startToggleVisibility()),
	startClearEstimates: () => dispatch(startClearEstimates())
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerBoard);

import React from 'react';
import { connect } from 'react-redux';
import PokerCard from './PokerCard';
import { startClearEstimates, startShowCards } from '../actions/selected-work-item';

export const PokerBoard = props => (
	<div>
		<hr />
		<div className="game-layout__actions">
			<button
				className="btn"
				disabled={
					!!props.selectedWorkItem && !!props.selectedWorkItem.id
						? props.selectedWorkItem.showEffort
						: true
				}
				onClick={props.startShowCards}
			>
				Flip Cards
			</button>
			<button className="btn" onClick={props.startClearEstimates}>
				Clear
			</button>
		</div>
		<hr />
		<div className="game-layout__estimates">
			{!!props.selectedWorkItem &&
				!!props.selectedWorkItem.effort &&
				Object.entries(props.selectedWorkItem.effort).map((estimate, index) => {
					return (
						<PokerCard
							key={index}
							gameId={props.gameId}
							card={estimate[1]}
							isVisible={props.selectedWorkItem.showEffort}
							allowClick={false}
						/>
					);
				})}
		</div>
	</div>
);

const mapStateToProps = (state, props) => ({
	selectedWorkItem: state.games.find(game => game.id === props.gameId).selectedWorkItem
});

const mapDispatchToProps = (dispatch, props) => ({
	startShowCards: () => dispatch(startShowCards(props.gameId)),
	startClearEstimates: () => dispatch(startClearEstimates(props.gameId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerBoard);

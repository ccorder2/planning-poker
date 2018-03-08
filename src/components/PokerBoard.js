import React from 'react';
import { connect } from 'react-redux';
import PokerCard from './PokerCard';
import { startClearEstimates, startShowCards } from '../actions/selected-work-item';
import {
	startJoinGame,
	startAddSpectator,
	startLeaveGame,
	startRemoveSpectator
} from '../actions/games';

export const PokerBoard = props => (
	<div>
		<hr />
		<div className="game-layout__actions">
			<div>
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
			<div>
				<button className="btn-left" disabled={props.isPlayer} onClick={props.startRemoveSpectator}>
					Player
				</button>
				<button className="btn-right" disabled={!props.isPlayer} onClick={props.startLeaveGame}>
					Spectator
				</button>
			</div>
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
	selectedWorkItem: state.games.find(game => game.id === props.gameId).selectedWorkItem,
	isPlayer: state.games.find(game => game.id === props.gameId).players.includes(state.auth.uid)
});

const mapDispatchToProps = (dispatch, props) => ({
	startShowCards: () => dispatch(startShowCards(props.gameId)),
	startClearEstimates: () => dispatch(startClearEstimates(props.gameId)),
	startLeaveGame: () =>
		dispatch(startLeaveGame(props.gameId)).then(() => dispatch(startAddSpectator(props.gameId))),
	startRemoveSpectator: () =>
		dispatch(startRemoveSpectator(props.gameId)).then(() => dispatch(startJoinGame(props.gameId)))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokerBoard);

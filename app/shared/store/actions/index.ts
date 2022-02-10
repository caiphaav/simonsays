import {gameSlice, resultsSlice} from '../slices';

export const {
  onHandleUserEntry,
  onGenerateSimonSequence,
  onChangePlaying,
  onReset,
} = gameSlice.actions;

export const {onAddResult} = resultsSlice.actions;

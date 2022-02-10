import {combineReducers} from '@reduxjs/toolkit';

import {gameSlice, resultsSlice} from '../slices';

export const reducer = combineReducers({
  game: gameSlice.reducer,
  results: resultsSlice.reducer,
});

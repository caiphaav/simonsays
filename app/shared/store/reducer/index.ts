import {combineReducers} from '@reduxjs/toolkit';

import {gameSlice} from '../slices';

export const reducer = combineReducers({
  game: gameSlice.reducer,
});

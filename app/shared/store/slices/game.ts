import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  level: 1,
  sequence: [],
  currentStep: 0,
  isGameOver: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {value: initialState},
  reducers: {
    increaseLevel: ({value}) => {
      value.level++;
    },
    resetLevel: ({value}) => {
      value.level = 0;
    },
    increaseScore: ({value}) => {
      value.score++;
    },
    resetScore: ({value}) => {
      value.score = 0;
    },
    setGameOver: ({value}) => {
      value.isGameOver = true;
    },
  },
});

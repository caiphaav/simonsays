import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IInitialState {
  score: number;
  level: number;
  sequence: Array<number>;
  isPlaying: boolean;
}

export interface ISetPlayingPayload {
  isPlaying: boolean;
}

const initialState = {
  score: 0,
  level: 1,
  sequence: [],
  isPlaying: true,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState as IInitialState,
  reducers: {
    increaseScore: state => {
      state.score++;
    },
    generateSequence: {
      reducer: (state, action: PayloadAction<Array<number>>) => {
        console.log(action.payload);
        state.sequence = action.payload;
      },
      prepare: (level: number) => {
        let arr = [];
        const max = 3;
        const min = 0;
        const randomIntFromInterval = () => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        };
        for (let i = 0; i < level; i++) {
          arr.push(randomIntFromInterval());
        }
        return {payload: arr};
      },
    },
    setPlaying: (state, {payload}: PayloadAction<ISetPlayingPayload>) => {
      console.log('setPlaying', payload.isPlaying);
      state.isPlaying = payload.isPlaying;
    },
  },
});

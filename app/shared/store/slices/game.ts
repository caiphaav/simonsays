import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Types} from '@shared';

export interface ChangePlayingEventPayload {
  isPlaying: boolean;
}

export interface HandleUserEntryEventPayload {
  userEntry: number;
}

const initialState: Types.IGameStore = {
  score: 0,
  level: 1,
  sequence: [],
  currentSequenceIndex: 0,
  isPlaying: true,
  isGameOver: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    onGenerateSimonSequence: {
      reducer: (state, action: PayloadAction<Array<number>>) => {
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
    onHandleUserEntry: (
      state,
      action: PayloadAction<HandleUserEntryEventPayload>,
    ) => {
      const currentSimonNumber = state.sequence[state.currentSequenceIndex];
      if (action.payload.userEntry !== currentSimonNumber) {
        state.isGameOver = true;
      } else {
        state.score++;
        if (state.currentSequenceIndex < state.sequence.length - 1)
          state.currentSequenceIndex++;
        else {
          state.level++;
          state.currentSequenceIndex = 0;
        }
      }
    },
    onChangePlaying: (
      state,
      {payload}: PayloadAction<ChangePlayingEventPayload>,
    ) => {
      state.isPlaying = payload.isPlaying;
    },
    onReset: state => {
      state.isGameOver = false;
      state.level = 1;
      state.score = 0;
      state.sequence = [];
      state.currentSequenceIndex = 0;
      state.isPlaying = true;
    },
  },
});

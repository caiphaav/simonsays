import {Dispatch, SetStateAction, useEffect} from 'react';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';

import {ISetPlayingPayload} from '../../shared/store/slices/game';

interface ISequencePlayerParams {
  sequence: Array<number>;
  setActiveNumber: Dispatch<SetStateAction<number | null>>;
  playingDispatcher: ActionCreatorWithPayload<ISetPlayingPayload, string>;
  time?: number;
  preDelay?: number;
}

export const useSequence = ({
  sequence,
  setActiveNumber,
  playingDispatcher,
  time = 1000,
  preDelay = 500,
}: ISequencePlayerParams) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;
    let playingTimeout: NodeJS.Timeout;

    if (isMounted) {
      dispatch(playingDispatcher({isPlaying: true}));
      sequence.forEach((number, index) => {
        timeout = setTimeout(() => {
          setActiveNumber(number);
          setActiveNumber(null);
        }, time * index + preDelay);
      });
      playingTimeout = setTimeout(() => {
        dispatch(playingDispatcher({isPlaying: false}));
      }, time * sequence.length + preDelay);
    }

    return () => {
      clearTimeout(timeout);
      clearTimeout(playingTimeout);
      isMounted = false;
    };
  }, [playingDispatcher, setActiveNumber, preDelay, sequence, time, dispatch]);
};

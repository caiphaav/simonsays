import {Dispatch, SetStateAction, useEffect} from 'react';

interface ISequencePlayerParams {
  sequence: Array<number>;
  onChange: Dispatch<SetStateAction<number | null>>;
  time?: number;
  preDelay?: number;
}

export const useSequencePlayer = ({
  sequence,
  onChange,
  time = 1000,
  preDelay = 500,
}: ISequencePlayerParams) => {
  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;
    if (isMounted) {
      sequence.forEach((el, index) => {
        timeout = setTimeout(() => {
          onChange(el);
        }, time * index + preDelay);
      });
    }

    return () => {
      clearTimeout(timeout);
      isMounted = false;
    };
  }, [onChange, preDelay, sequence, time]);
};

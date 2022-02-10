import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

import {hdp, storeActions} from '@shared';

interface IActionButton {
  backgroundColor: string;
  index: number;
  activeIndex: number | null;
  enabled: boolean;
}

Sound.setCategory('Playback');

const ping = new Sound('ping.wav', Sound.MAIN_BUNDLE);

const onPlaySound = () => {
  ping.play();
};

const onStopSound = () => {
  ping.stop();
};

export const ActionButton = ({
  backgroundColor,
  index,
  activeIndex,
  enabled,
}: IActionButton) => {
  const dispatch = useDispatch();
  const scale = useSharedValue(1);

  const onIncrease = useCallback(() => {
    dispatch(storeActions.onHandleUserEntry({userEntry: index}));
  }, [dispatch, index]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: _ => {
      runOnJS(onPlaySound)();
      scale.value = withTiming(0.5);
    },
    onFinish: _ => {
      runOnJS(onStopSound)();
      scale.value = withTiming(1);
      runOnJS(onIncrease)();
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (activeIndex === index) {
      ping.play();
      scale.value = withSequence(
        withTiming(0.5),
        withTiming(1, {}, f => {
          if (f) {
            runOnJS(onStopSound)();
          }
        }),
      );
    }
  }, [activeIndex, index, scale]);

  return (
    <PanGestureHandler enabled={enabled} onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[styles.button, animatedStyle, {backgroundColor}]}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '49%',
    width: '49%',
    marginBottom: hdp(8),
    borderRadius: hdp(96),
  },
});

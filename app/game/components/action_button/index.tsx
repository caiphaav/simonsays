import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {hdp} from '@shared';

interface IActionButton {
  backgroundColor: string;
  index: number;
  activeIndex: number | null;
}

export const ActionButton = ({
  backgroundColor,
  index,
  activeIndex,
}: IActionButton) => {
  const scale = useSharedValue(1);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: _ => {
      scale.value = withTiming(0.5);
    },
    onFinish: _ => {
      scale.value = withTiming(1);
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
      scale.value = withSequence(withTiming(0.5), withTiming(1));
    }
  }, [activeIndex, index, scale]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
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
    borderRadius: 80,
  },
});

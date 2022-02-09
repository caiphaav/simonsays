import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {hdp} from '@shared';

interface IActionButton {
  backgroundColor: string;
}

export const ActionButton = ({backgroundColor}: IActionButton) => {
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

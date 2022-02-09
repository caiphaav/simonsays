import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles, hdp} from '@shared';

import {ActionButton} from './components';
import {SIMON_CONFIG} from './constants';
import {useSequencePlayer} from './hooks';

const SEQUENCE = [0, 2, 1];

export const Game = ({
  navigation: {},
}: StackScreenProps<Types.RootStackParamList, 'Game'>) => {
  const style = useThemedStyles(styles);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const renderItem = useCallback(
    ({index, backgroundColor}: Types.ISimonItem) => (
      <ActionButton
        key={index}
        activeIndex={activeIndex}
        backgroundColor={backgroundColor}
        index={index}
      />
    ),
    [activeIndex],
  );

  useSequencePlayer({
    sequence: SEQUENCE,
    onChange: setActiveIndex,
    preDelay: 2000,
  });

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.wrapper}>{SIMON_CONFIG.map(renderItem)}</View>
    </SafeAreaView>
  );
};

const styles = ({palette}: Types.ITheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.primary,
    },
    wrapper: {
      width: '80%',
      height: '40%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      borderColor: palette.secondary,
      borderWidth: hdp(8),
      borderRadius: hdp(64),
      overflow: 'hidden',
    },
    title: {
      color: palette.secondary,
    },
  });

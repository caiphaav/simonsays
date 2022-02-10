import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles, hdp, wdp, storeActions} from '@shared';

import {ActionButton} from './components';
import {SIMON_CONFIG} from './constants';
import {useSequence} from './hooks';

export const Game = ({
  navigation: {navigate},
}: StackScreenProps<Types.RootStackParamList, 'Game'>) => {
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);
  const state = useSelector((s: Types.IAppStore) => s.game);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const renderItem = useCallback(
    ({index, backgroundColor}: Types.ISimonItem) => (
      <ActionButton
        key={index}
        activeIndex={activeIndex}
        backgroundColor={backgroundColor}
        index={index}
        enabled={!state.isPlaying}
      />
    ),
    [activeIndex, state.isPlaying],
  );

  /**
   * Hook responsible for handling actions with Simon's sequence
   * */
  useSequence({
    sequence: state.sequence,
    setActiveNumber: setActiveIndex,
    playingDispatcher: storeActions.onChangePlaying,
    preDelay: 1250,
  });

  /**
   * Generate sequence per level
   * */
  useEffect(() => {
    dispatch(storeActions.onGenerateSimonSequence(state.level));
  }, [dispatch, state.level]);

  console.log('state.isGameOver', state.isGameOver);
  /**
   * Navigate to game over screen if loosed
   * */
  useEffect(() => {
    if (state.isGameOver) {
      navigate('Results');
    }
  }, [navigate, state.isGameOver]);

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.scoreWrapper}>
        <Text>Level: {state.level}</Text>
        <Text>Score: {state.score}</Text>
      </View>
      <View style={style.wrapper}>{SIMON_CONFIG.map(renderItem)}</View>
    </SafeAreaView>
  );
};

const styles = ({palette, typography}: Types.ITheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.primary,
      position: 'relative',
    },
    scoreWrapper: {
      position: 'absolute',
      top: hdp(16),
      right: wdp(16),
    },
    score: {
      ...typography.medium,
      color: palette.secondary,
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

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles, useTheme} from '@shared';

import {ActionButton} from './components';
import {hdp} from '../shared';

export const Game = ({
  navigation: {},
}: StackScreenProps<Types.RootStackParamList, 'Game'>) => {
  const theme = useTheme();
  const style = useThemedStyles(styles);

  // const onPress = useCallback(() => navigate('Results'), [navigate]);

  return (
    <SafeAreaView style={style.screen}>
      <View style={style.wrapper}>
        <ActionButton backgroundColor={theme.palette.red} />
        <ActionButton backgroundColor={theme.palette.green} />
        <ActionButton backgroundColor={theme.palette.blue} />
        <ActionButton backgroundColor={theme.palette.orange} />
      </View>
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

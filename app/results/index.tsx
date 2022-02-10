import React, {useCallback} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';

import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles, storeActions} from '@shared';
import {useDispatch} from 'react-redux';

export const Results = ({
  navigation: {navigate},
}: StackScreenProps<Types.RootStackParamList, 'Results'>) => {
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);

  const onPress = useCallback(() => {
    dispatch(storeActions.onReset());
    navigate('Start');
  }, [dispatch, navigate]);

  return (
    <SafeAreaView style={style.screen}>
      <Button title={'Game over'} onPress={onPress} />
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
    title: {
      color: palette.secondary,
    },
  });

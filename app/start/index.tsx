import React, {useCallback, useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';

import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles, storeActions} from '@shared';
import {useDispatch} from 'react-redux';

export const Start = ({
  navigation: {navigate},
}: StackScreenProps<Types.RootStackParamList, 'Start'>) => {
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);

  const onPress = useCallback(() => navigate('Game'), [navigate]);

  useEffect(() => {
    // initial reset
    dispatch(storeActions.onReset());
  }, [dispatch]);

  return (
    <SafeAreaView style={style.screen}>
      <Button title={'Start'} onPress={onPress} />
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

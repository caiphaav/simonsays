import React, {useCallback} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';

import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles} from '@shared';

export const Start = ({
  navigation: {navigate},
}: StackScreenProps<Types.RootStackParamList, 'Start'>) => {
  const style = useThemedStyles(styles);

  const onPress = useCallback(() => navigate('Game'), [navigate]);

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

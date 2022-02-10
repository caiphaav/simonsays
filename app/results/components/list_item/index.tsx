import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

import {useThemedStyles, Types, wdp, hdp} from '@shared';

const {width} = Dimensions.get('screen');

interface IListITem {
  item: Types.IResult;
}

export const ListItem = ({item}: IListITem) => {
  const style = useThemedStyles(styles);
  return (
    <View style={style.item}>
      <Text>Player: {item.name}</Text>
      <Text>Score: {item.score}</Text>
    </View>
  );
};

const styles = ({palette, typography}: Types.ITheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.primary,
    },
    title: {
      color: palette.secondary,
      ...typography.large,
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width,
      height: hdp(48),
      borderBottomColor: palette.secondary,
      borderBottomWidth: hdp(1),
      paddingHorizontal: wdp(16),
    },
    name: {
      ...typography.medium,
    },
    score: {
      ...typography.large,
    },
  });

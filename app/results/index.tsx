import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  BackHandler,
  View,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import type {StackScreenProps} from '@react-navigation/stack';

import {
  Types,
  useThemedStyles,
  storeActions,
  SharedComponents,
  hdp,
  wdp,
  useTheme,
} from '@shared';

import * as LocalComponents from './components';

const renderItem = ({item}: {item: Types.IResult}) => (
  <LocalComponents.ListItem item={item} />
);

const keyExtractor = (item: Types.IResult) => item.id;

export const Results = ({
  navigation: {navigate},
}: StackScreenProps<Types.RootStackParamList, 'Results'>) => {
  const {
    palette: {secondary},
  } = useTheme();
  const ranking = useSelector((s: Types.IAppStore) => s.results.ranking);
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const goBack = useCallback(() => {
    dispatch(storeActions.onReset());
    navigate('Start');
  }, [dispatch, navigate]);

  const fRanking = useMemo(
    () =>
      ranking
        .slice()
        .sort((a: Types.IResult, b: Types.IResult) =>
          a.score > b.score ? -1 : 1,
        ),
    [ranking],
  );

  useEffect(() => {
    setModalVisible(true);

    BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, [goBack]);

  return (
    <SafeAreaView style={style.screen}>
      <LocalComponents.Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        goBack={goBack}
      />
      <SharedComponents.VerticalBox height={64} />
      <View style={style.absolute}>
        <Pressable onPress={goBack}>
          <LocalComponents.CloseIcon fill={secondary} width={24} height={24} />
        </Pressable>
      </View>
      <Text style={style.title}>Ranking:</Text>
      <FlatList
        data={fRanking}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
    },
    absolute: {
      position: 'absolute',
      top: hdp(24),
      right: hdp(24),
    },
    title: {
      color: palette.secondary,
      ...typography.large,
    },
  });

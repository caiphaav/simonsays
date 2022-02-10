import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import type {StackScreenProps} from '@react-navigation/stack';

import {Types, useThemedStyles, storeActions, SharedComponents} from '@shared';

import * as LocalComponents from './components';

const renderItem = ({item}: {item: Types.IResult}) => (
  <LocalComponents.ListItem item={item} />
);

const keyExtractor = (_: Types.IResult, index: number) => index.toString();

export const Results = ({
  navigation: {navigate},
}: StackScreenProps<Types.RootStackParamList, 'Results'>) => {
  const ranking = useSelector((s: Types.IAppStore) => s.results.ranking);
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const goBack = useCallback(() => {
    dispatch(storeActions.onReset());
    navigate('Start');
  }, [dispatch, navigate]);

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
      <SharedComponents.VerticalBox height={24} />
      <Text style={style.title}>Ranking:</Text>
      <FlatList
        data={ranking}
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
    title: {
      color: palette.secondary,
      ...typography.large,
    },
  });

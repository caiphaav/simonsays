import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Modal as RNModal,
  Text,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  Types,
  useThemedStyles,
  storeActions,
  SharedComponents,
  hdp,
} from '@shared';

interface IModal {
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  goBack: () => void;
}

export const Modal = ({isModalVisible, setModalVisible, goBack}: IModal) => {
  const dispatch = useDispatch();
  const state = useSelector((s: Types.IAppStore) => s.game);
  const style = useThemedStyles(styles);

  const ref = useRef<TextInput>();
  const [name, setName] = useState<string>('');

  const onConfirm = useCallback(() => {
    if (name.length < 1) return;
    dispatch(
      storeActions.onAddResult({
        result: {score: state.score, name},
      }),
    );
    setModalVisible(false);
  }, [dispatch, name, setModalVisible, state.score]);

  useEffect(() => {
    const timeout = setTimeout(() => ref.current?.focus(), 500);

    return () => clearTimeout(timeout);
  }, [ref.current?.focus]);

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={goBack}>
      <View style={style.modalWrapper}>
        <View style={style.modalInner}>
          <Text style={style.text}>Game over!</Text>
          <Text style={style.text}>Your score: {state.score}</Text>
          <Text style={style.text}>Enter your name:</Text>
          <SharedComponents.VerticalBox height={16} />
          <TextInput
            // @ts-expect-error with TextInput type
            ref={ref}
            value={name}
            onChangeText={setName}
            style={style.textInput}
            placeholderTextColor={'gray'}
            placeholder={'Enter your name'}
          />
          <SharedComponents.VerticalBox height={8} />
          <Button title={'Confirm'} onPress={onConfirm} />
        </View>
      </View>
    </RNModal>
  );
};

const styles = ({palette, typography}: Types.ITheme) =>
  StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalInner: {
      backgroundColor: palette.secondary,
      paddingVertical: hdp(24),
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: palette.primary,
      ...typography.medium,
    },
    textInput: {
      padding: 0,
      color: palette.primary,
      height: hdp(48),
    },
  });

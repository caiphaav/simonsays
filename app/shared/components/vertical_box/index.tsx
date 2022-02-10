import React, {memo} from 'react';
import {View} from 'react-native';

interface IVerticalBox {
  height: number;
}

export const VerticalBox = memo(({height}: IVerticalBox) => {
  return <View style={{height}} />;
});

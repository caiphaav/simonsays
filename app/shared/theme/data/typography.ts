import {Platform} from 'react-native';

import {hdp} from './dp';

import {ITypography} from '../../types';

const fontFamily = Platform.OS === 'ios' ? 'OpenSans-Regular' : 'open_sans';

export const typography: ITypography = {
  small: {
    fontFamily,
    fontSize: hdp(18),
  },
  medium: {
    fontFamily,
    fontSize: hdp(14),
  },
  large: {
    fontFamily,
    fontSize: hdp(13),
  },
};

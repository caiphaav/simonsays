import {ITheme} from '../../types';
import {typography} from './typography';
import {darkPalette, lightPalette} from './palette';

export {hdp, wdp} from './dp';

export const lightTheme: ITheme = {
  typography,
  palette: lightPalette,
};

export const darkTheme: ITheme = {
  typography,
  palette: darkPalette,
};

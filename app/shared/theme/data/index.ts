import {ITheme} from '../../types';
import {typography} from './typography';
import {darkPalette, lightPalette} from './palette';

export const lightTheme: ITheme = {
  typography,
  palette: lightPalette,
};

export const darkTheme: ITheme = {
  typography,
  palette: darkPalette,
};

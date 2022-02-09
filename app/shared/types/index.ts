import {ReactChild} from 'react';

export type RootStackParamList = {
  Start: undefined;
  Game: undefined;
  Results: undefined;
};

export interface IPalette {
  primary: string;
  secondary: string;
  orange: string;
  red: string;
  green: string;
  blue: string;
}

export interface ITypographyItem {
  fontSize: number;
  fontFamily: string;
}

export interface ITypography {
  small: ITypographyItem;
  medium: ITypographyItem;
  large: ITypographyItem;
}

export interface ITheme {
  palette: IPalette;
  typography: ITypography;
}

export interface IThemeProvider {
  children: ReactChild;
}

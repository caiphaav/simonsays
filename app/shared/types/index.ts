import {ReactChild} from 'react';

export type RootStackParamList = {
  Start: undefined;
  Game: undefined;
  Results: undefined;
};

export interface ISimonItem {
  backgroundColor: string;
  index: number;
}

export interface IGameStore {
  value: {
    score: number;
    level: number;
    sequence: Array<0 | 1 | 2 | 3>;
    currentStep: number;
    isGameOver: boolean;
  };
}

export interface IAppStore {
  game: IGameStore;
}

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

import * as React from 'react';
import {Appearance, ColorSchemeName, StyleSheet} from 'react-native';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';

import {ITheme, IThemeProvider} from '../types';

import {lightTheme, darkTheme} from './data';

const ThemeContext = createContext<ITheme | undefined>(undefined);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Theme context is not defined');
  }

  return theme;
};

export const useThemedStyles = (
  styles: (theme: ITheme) => StyleSheet.NamedStyles<any>,
) => {
  const theme = useTheme();
  return styles(theme);
};

export const ThemeProvider = ({children}: IThemeProvider) => {
  const [mode, setMode] = useState<ColorSchemeName>('dark');

  const value = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode],
  );

  useEffect(() => {
    setMode(Appearance.getColorScheme());
  }, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

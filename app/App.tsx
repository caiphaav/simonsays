import * as React from 'react';
import {StyleSheet} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ThemeProvider, Types} from '@shared';

import {Start} from './start';
import {Results} from './results';
import {Game} from './game';

const Stack = createStackNavigator<Types.RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'Start'}>
              <Stack.Screen name="Start" component={Start} />
              <Stack.Screen name="Results" component={Results} />
              <Stack.Screen name="Game" component={Game} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

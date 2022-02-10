import * as React from 'react';
import {StyleSheet} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {ThemeProvider, Types, store, persistor, Constants} from '@shared';

import {Start} from './start';
import {Results} from './results';
import {Game} from './game';

const Stack = createStackNavigator<Types.RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={'Start'}
                  screenOptions={Constants.SCREEN_OPTIONS}>
                  <Stack.Screen name="Start" component={Start} />
                  <Stack.Screen name="Game" component={Game} />
                  <Stack.Screen name="Results" component={Results} />
                </Stack.Navigator>
              </NavigationContainer>
            </PersistGate>
          </Provider>
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

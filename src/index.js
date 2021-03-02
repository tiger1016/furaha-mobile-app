import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import r from './store';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/home';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const {store, persistor} = r;
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});

export default App;

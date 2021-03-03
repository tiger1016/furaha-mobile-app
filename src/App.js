import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {NativeRouter} from 'react-router-native';
import r from './store';
import Root from './Root';

const {store, persistor} = r;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeRouter>
          <Root />
        </NativeRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

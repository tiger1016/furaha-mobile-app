import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Router} from 'react-router';
import r from './store';
import {config, setHistory} from './store';
import Root from './Root';

const {store, persistor} = r;
setHistory();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={config.history}>
          <Root />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

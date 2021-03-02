import React from 'react';
import {Button, Layout, Text, Icon} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import r from './store';
import Config from "react-native-config";

const HeartIcon = (props) => <Icon {...props} name="heart" />;

const {store, persistor} = r;
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Welcome to {Config.API_URL}
          </Text>
          <Text style={styles.text} category="s1">
            Start with editing App.js to configure your App
          </Text>
          <Text style={styles.text} appearance="hint">
            For example, try changing theme to Dark by using eva.dark
          </Text>
          <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
            LIKE
          </Button>
        </Layout>
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

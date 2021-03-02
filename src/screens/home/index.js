import React from 'react';
import Config from 'react-native-config';
import {Button, Layout, Text, Icon} from '@ui-kitten/components';

const HeartIcon = (props) => <Icon {...props} name="heart" />;

export const HomeScreen = () => {
  return (
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text category="h1">
            Welcome to {Config.API_URL}
          </Text>
          <Text category="s1">
            Start with editing App.js to configure your App
          </Text>
          <Text appearance="hint">
            For example, try changing theme to Dark by using eva.dark
          </Text>
          <Button accessoryLeft={HeartIcon}>
            LIKE
          </Button>
    </Layout>
  );
}
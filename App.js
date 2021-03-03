import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import theme from './src/theme/theme.json';
import mapping from './src/theme/mapping.js';
import App from './src/App';

import {enableScreens} from 'react-native-screens';

enableScreens();

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={{...eva.light, ...theme}}
      customMapping={mapping}>
      <App />
    </ApplicationProvider>
  </>
);

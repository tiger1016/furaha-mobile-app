import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import customTheme from './src/theme/theme.json';
import mapping from './src/theme/mapping.js';
import App from './src/App';
import {FontAwesomeIconsPack} from './src/theme/font-awesome';
import {FeatherIconsPack} from './src/theme/feature';
import {MaterialIconsPack} from './src/theme/material';
import {ThemeContext} from './src/services/context';

import {enableScreens} from 'react-native-screens';

enableScreens();

export default () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry
        icons={[
          EvaIconsPack,
          FontAwesomeIconsPack,
          FeatherIconsPack,
          MaterialIconsPack,
        ]}
      />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider
          {...eva}
          theme={{...eva[theme], ...customTheme}}
          customMapping={mapping}>
          <App />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

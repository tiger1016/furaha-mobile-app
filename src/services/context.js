import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useAppTheme = () => React.useContext(ThemeContext);

import React from 'react';
import {Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';
import {createStackNavigator} from '@react-navigation/stack';
import Register1 from '../Register1';
import Register2 from '../Register2';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const Login = ({}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register1" component={Register1} />
        <Stack.Screen name="Register2" component={Register2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function mapStateToProps(state) {
  return {
    width: state.layout.width,
  };
}

export default connect(mapStateToProps)(Login);

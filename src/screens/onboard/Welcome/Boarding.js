import React from 'react';
import {Button, Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {withRouter} from 'react-router-native';
import themeStyles from './style';
import {Easing} from 'react-native';

const StartIcon = (props) => (
  <Icon
    {...props}
    pack="material"
    name="people"
    style={{width: 35, height: 35, color: '#fff'}}
  />
);

const Boarding = ({toggled, setToggled, setSw, animation, ...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={{marginRight: 50}}>
      <Layout style={[styles.desc, {marginTop: toggled ? 0 : 130}]}>
        <Text category="h5" style={{letterSpacing: 1, fontWeight: '700'}}>
          Welcome
        </Text>
        <Text category="p1" style={{letterSpacing: 0.48, marginTop: 10}}>
          Find Artisians around you with ease on furaha app
        </Text>
      </Layout>
      <Layout style={{marginTop: 40}}>
        <Button
          size="giant"
          status="primary"
          onPress={() => {
            setToggled(true);
            props.history.push('/welcome/signin');
            animation(300, Easing.linear);
          }}>
          <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
            Login
          </Text>
        </Button>
        <Button
          size="giant"
          status="warning"
          accessoryLeft={StartIcon}
          onPress={() => {
            setToggled(true);
            setSw(3);
            props.history.push('/welcome/signup');
            animation(300, Easing.linear);
          }}
          style={{paddingVertical: 0, marginTop: 15}}>
          <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
            Create an Account
          </Text>
        </Button>
      </Layout>
    </Layout>
  );
};

export default withRouter(Boarding);

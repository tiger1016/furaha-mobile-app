import React from 'react';
import {Button, Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageBackground, Image} from 'react-native';

const image = require('../../../assets/img/first.png');
const StartIcon = (props) => (
  <Icon {...props} name="people" style={{width: 30, height: 30}} />
);

const BookingStep = ({...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.backContainer}>
      <Image
        source={require('../../../assets/img/first.png')}
        resizeMode="cover"
        style={styles.outContainer}
      />
      <Layout style={styles.innerContainer}>
        <Layout style={styles.logoContainer}>
          <Text category="h5" style={{letterSpacing: 1}}>
            FURAHA
          </Text>
        </Layout>
        <Layout style={{marginTop: 1}}>
          <Text category="h6" style={{letterSpacing: 1}}>
            Welcome
          </Text>
          <Text category="p1" style={{letterSpacing: 0.48, marginTop: 10}}>
            Find Artisians around you with ease on furaha app
          </Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Button size="giant" status="primary" style={styles.btn}>
            <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
              Login
            </Text>
          </Button>
          <Button
            size="giant"
            status="warning"
            accessoryLeft={StartIcon}
            style={{paddingVertical: 0, marginTop: 15}}>
            <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
              Create an Account
            </Text>
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    width: state.layout.width,
  };
}

export default connect(mapStateToProps)(BookingStep);

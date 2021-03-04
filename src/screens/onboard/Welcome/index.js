import React, {useEffect} from 'react';
import {Button, Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';
import {Animated, Easing, Image} from 'react-native';
import {useTheme} from '../../../services/context';

const StartIcon = (props) => (
  <Icon
    {...props}
    pack="material"
    name="people"
    style={{width: 35, height: 35, color: '#fff'}}
  />
);

const BookingStep = ({layout, ...props}) => {
  const styles = useStyleSheet(themeStyles);
  const spinValue = new Animated.Value(0);

  const animation = () => {
    Animated.timing(spinValue, {
      duration: 1500,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const animatedData = {
    transform: [
      {
        rotate: spinValue.interpolate({
          inputRange: [0, 0.3, 0.6, 0.8, 1],
          outputRange: ['0deg', '0deg', '-15deg', '-15deg', '0deg'],
        }),
      },
      {
        scaleX: spinValue.interpolate({
          inputRange: [0, 0.3, 0.6, 0.8, 1],
          outputRange: [1, 1, 1.7, 1.7, 1],
        }),
      },
      {
        scaleY: spinValue.interpolate({
          inputRange: [0, 0.3, 0.6, 0.8, 1],
          outputRange: [1, 1, 1.7, 1.7, 1],
        }),
      },
      {
        translateX: spinValue.interpolate({
          inputRange: [0, 0.3, 0.6, 0.8, 1],
          outputRange: [0, 0, -35, -35, 0],
        }),
      },
    ],
    height: spinValue.interpolate({
      inputRange: [0, 0.6, 0.8, 1],
      outputRange: [
        layout.height,
        layout.height,
        layout.height,
        layout.height / 2,
      ],
    }),
    borderBottomRightRadius: spinValue.interpolate({
      inputRange: [0, 0.6, 0.8, 1],
      outputRange: [0, 0, 0, layout.width - 130],
    }),
  };

  const theme = useTheme();

  useEffect(() => {
    animation();
  }, []);

  return (
    <Layout style={styles.backContainer}>
      <Animated.Image
        source={require('../../../assets/img/first.png')}
        style={[styles.outContainer, {...animatedData}]}
      />
      <Layout style={styles.innerContainer}>
        <Layout style={styles.logoContainer}>
          <Image
            source={
              theme === 'dark'
                ? require('../../../assets/img/logo-white.png')
                : require('../../../assets/img/logo.png')
            }
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </Layout>
        <Layout style={{top: -30}}>
          <Text category="h6" style={{letterSpacing: 1, fontWeight: '700'}}>
            Welcome
          </Text>
          <Text category="p1" style={{letterSpacing: 0.48, marginTop: 15}}>
            Find Artisians around you with ease on furaha app
          </Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Button size="giant" status="primary">
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
    layout: state.layout,
  };
}

export default connect(mapStateToProps)(BookingStep);

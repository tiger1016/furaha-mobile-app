import React, {useEffect, useState, useRef} from 'react';
import {
  Button,
  Layout,
  Text,
  Icon,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';
import {Animated, Easing} from 'react-native';
import {useAppTheme} from '../../../services/context';
import Signin from '../Login';
import Signup from '../Register1';

const StartIcon = (props) => (
  <Icon
    {...props}
    pack="material"
    name="people"
    style={{width: 35, height: 35, color: '#fff'}}
  />
);

const logos = [
  require('../../../assets/img/logo.png'),
  require('../../../assets/img/logo-white.png'),
];

const Welcome = ({layout, ...props}) => {
  const [toggled, setToggled] = useState(false);
  const [step, setStep] = useState('welcome');

  const styles = useStyleSheet(themeStyles);
  const spinValue = useRef(new Animated.Value(0)).current;

  const animation = (duration) => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      duration,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const dynamicStyles = {
    image: () => ({
      transform: [
        {
          rotate: spinValue.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: toggled
              ? ['0deg', '0deg', '0deg', '0deg', '0deg']
              : ['0deg', '0deg', '-15deg', '-15deg', '0deg'],
          }),
        },
        {
          scaleX: spinValue.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: toggled ? [1, 1, 1, 1, 1] : [1, 1, 1.6, 1.6, 1],
          }),
        },
        {
          scaleY: spinValue.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: toggled ? [1, 1, 1, 1, 1] : [1, 1, 1.6, 1.6, 1],
          }),
        },
        {
          translateX: spinValue.interpolate({
            inputRange: [0, 0.3, 0.6, 0.8, 1],
            outputRange: toggled ? [0, 0, 0, 0, 0] : [0, 0, -10, -10, 0],
          }),
        },
      ],
      height: spinValue.interpolate({
        inputRange: toggled ? [0, 1] : [0, 0.6, 0.8, 1],
        outputRange: toggled
          ? [layout.height / 2, layout.height / 3]
          : [layout.height, layout.height, layout.height, layout.height / 2],
      }),
      borderBottomRightRadius: spinValue.interpolate({
        inputRange: toggled ? [0, 1] : [0, 0.6, 0.8, 1],
        outputRange: toggled
          ? [layout.width - 130, layout.width - 300]
          : [0, 0, 0, layout.width - 130],
      }),
    }),
    view: () => ({
      height: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled
          ? [layout.height / 2 + 50, layout.height / 2 + 70]
          : [layout.height / 2 + 50, layout.height / 2 + 50],
      }),
    }),
    logoView: () => ({
      top: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled ? [0, -55] : [0, 0],
      }),
      marginTop: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled ? [80, 0] : [80, 80],
      }),
    }),
    logo: () => ({
      opacity: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      width: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled ? [175, 110] : [170, 175],
      }),
      height: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled ? [55, 35] : [65, 55],
      }),
    }),
    backView: () => ({
      backgroundColor: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled
          ? [evaTheme['color-basic-800'], evaTheme['color-warning-100']]
          : [evaTheme['color-basic-800'], evaTheme['color-basic-800']],
      }),
    }),
  };

  const theme = useAppTheme();
  const evaTheme = useTheme();

  useEffect(() => {
    animation(1500);
  }, []);

  return (
    <Animated.View
      style={[styles.backContainer, {...dynamicStyles.backView()}]}>
      <Animated.Image
        source={require('../../../assets/img/first.png')}
        style={[styles.outContainer, {...dynamicStyles.image()}]}
      />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            ...dynamicStyles.view(),
          },
        ]}>
        <Animated.View
          style={[styles.logoContainer, {...dynamicStyles.logoView()}]}>
          <Animated.Image
            source={theme === 'dark' ? logos[1] : logos[0]}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              ...dynamicStyles.logo(),
            }}
          />
        </Animated.View>
        {step === 'welcome' ? (
          <Layout style={{marginRight: 50}}>
            <Layout style={[styles.desc, {marginTop: toggled ? 0 : 30}]}>
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
                  setStep('signin');
                  animation(400);
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
                  setStep('signup');
                  animation(400);
                }}
                style={{paddingVertical: 0, marginTop: 15}}>
                <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
                  Create an Account
                </Text>
              </Button>
            </Layout>
          </Layout>
        ) : step === 'signin' ? (
          <Signin />
        ) : (
          <Signup />
        )}
      </Animated.View>
    </Animated.View>
  );
};

function mapStateToProps(state) {
  return {
    layout: state.layout,
  };
}

export default connect(mapStateToProps)(Welcome);

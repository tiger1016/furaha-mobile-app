import React, {useEffect, useState, useRef} from 'react';
import {Layout, useStyleSheet, useTheme, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {Animated, Easing} from 'react-native';
import {Switch, Route} from 'react-router-native';
import {useAppTheme} from '../../../services/context';
import themeStyles from './style';
import Boarding from './Boarding';
import Signin from '../Login';
import Signup from '../Register';

const logos = [
  require('../../../assets/img/logo.png'),
  require('../../../assets/img/logo-white.png'),
];

const Welcome = ({layout, ...props}) => {
  const [toggled, setToggled] = useState(false);
  const [step, setStep] = useState(0);
  const [sw, setSw] = useState(0);

  const styles = useStyleSheet(themeStyles);
  const spinValue = useRef(new Animated.Value(0)).current;

  const animation = (duration, type) => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      duration,
      toValue: 1,
      easing: type,
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
            inputRange: sw === 0 ? [0, 0.3, 0.6, 0.8, 1] : [0, 1],
            outputRange: toggled
              ? sw === 0
                ? [1, 1, 1, 1, 1]
                : sw === 1
                ? [1, 1.1]
                : sw === 2
                ? [1.1, 1]
                : [1, 1.1]
              : [1, 1, 1.6, 1.6, 1],
          }),
        },
        {
          scaleY: spinValue.interpolate({
            inputRange: sw === 0 ? [0, 0.3, 0.6, 0.8, 1] : [0, 1],
            outputRange: toggled
              ? sw === 0
                ? [1, 1, 1, 1, 1]
                : sw === 1
                ? [1, 1.1]
                : sw === 2
                ? [1.1, 1]
                : [1, 1.1]
              : [1, 1, 1.6, 1.6, 1],
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
          ? sw === 0
            ? [layout.height / 2 - 50, layout.height / 3 - 70]
            : sw === 1
            ? [layout.height / 3 - 70, layout.height / 3 - 50]
            : sw === 2
            ? [layout.height / 3 - 50, layout.height / 3 - 70]
            : [layout.height / 2 - 50, layout.height / 3 - 50]
          : [
              layout.height,
              layout.height,
              layout.height,
              layout.height / 2 - 50,
            ],
      }),
      borderBottomRightRadius: spinValue.interpolate({
        inputRange: toggled ? [0, 1] : [0, 0.6, 0.8, 1],
        outputRange: toggled
          ? sw === 0
            ? [layout.width - 150, layout.width - 300]
            : sw === 1
            ? [layout.width - 300, layout.width - 310]
            : sw === 2
            ? [layout.width - 310, layout.width - 300]
            : [layout.width - 150, layout.width - 310]
          : [0, 0, 0, layout.width - 150],
      }),
    }),
    view: () => ({
      height: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled
          ? sw === 0
            ? [layout.height / 2 + 90, layout.height / 2 + 150]
            : sw === 1
            ? [layout.height / 2 + 150, layout.height / 2 + 110]
            : sw === 2
            ? [layout.height / 2 + 110, layout.height / 2 + 150]
            : [layout.height / 2 + 90, layout.height / 2 + 110]
          : [layout.height / 2 + 90, layout.height / 2 + 90],
      }),
    }),
    logoView: () => ({
      top: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled
          ? sw === 0
            ? [layout.height / 3 + 60, layout.height / 3 - 135]
            : sw === 1
            ? [layout.height / 3 - 135, layout.height / 3 - 100]
            : sw === 2
            ? [layout.height / 3 - 100, layout.height / 3 - 135]
            : [layout.height / 3 + 60, layout.height / 3 - 100]
          : [layout.height / 3 + 60, layout.height / 3 + 60],
      }),
    }),
    logo: () => ({
      width: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled
          ? sw === 0
            ? [175, 130]
            : [130, 130]
          : [170, 175],
      }),
      height: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled ? (sw === 0 ? [55, 45] : [45, 45]) : [65, 55],
      }),
    }),
    backView: () => ({
      backgroundColor: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: toggled
          ? sw === 0
            ? [evaTheme['color-basic-800'], evaTheme['color-warning-100']]
            : [evaTheme['color-warning-100'], evaTheme['color-warning-100']]
          : [evaTheme['color-basic-800'], evaTheme['color-basic-800']],
      }),
    }),
  };

  const theme = useAppTheme();
  const evaTheme = useTheme();

  useEffect(() => {
    animation(1500, Easing.linear);
  }, []);

  return (
    <Animated.View
      style={[styles.backContainer, {...dynamicStyles.backView()}]}>
      <Animated.Image
        source={
          step === 0
            ? require('../../../assets/img/makeup.png')
            : step === 1 || step === 2
            ? require('../../../assets/img/step2.jpg')
            : require('../../../assets/img/step3.jpg')
        }
        style={[styles.outContainer, {zIndex: 2, ...dynamicStyles.image()}]}
      />
      <Layout
        style={[
          styles.titleWrapper,
          {display: sw === 1 || sw === 3 ? 'flex' : 'none'},
        ]}>
        <Text
          category="h4"
          style={{color: 'white', fontWeight: '600', marginBottom: 10}}>
          Makeups
        </Text>
        <Text
          category="s1"
          style={{color: 'white', letterSpacing: 0.5, lineHeight: 20}}>
          Find Artisians around you with ease on furaha app
        </Text>
        <Layout style={styles.titleStepWrapper}>
          <Layout
            style={{
              ...styles.titleStep,
              backgroundColor: step === 0 ? '#FFFF00' : '#FFF',
            }}></Layout>
          <Layout
            style={{
              ...styles.titleStep,
              backgroundColor: step === 1 || step === 2 ? '#FFFF00' : '#FFF',
            }}></Layout>
          <Layout
            style={{
              ...styles.titleStep,
              backgroundColor: step === 3 ? '#FFFF00' : '#FFF',
            }}></Layout>
        </Layout>
      </Layout>
      <Animated.View
        style={[
          styles.logoContainer,
          {zIndex: 1, marginLeft: 50, ...dynamicStyles.logoView()},
        ]}>
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
      <Animated.View
        style={[
          styles.innerContainer,
          {
            paddingVertical: 35,
            ...dynamicStyles.view(),
          },
        ]}>
        <Switch>
          <Route
            path="/welcome/signin/"
            component={() => (
              <Signin setSw={setSw} animation={animation} setStep={setStep} />
            )}
          />
          <Route
            path="/welcome/signup"
            component={() => (
              <Signup
                setSw={setSw}
                animation={animation}
                step={step}
                setStep={setStep}
              />
            )}
          />
          <Route
            path="/welcome"
            component={() => (
              <Boarding
                toggled={toggled}
                setToggled={setToggled}
                setSw={setSw}
                animation={animation}
              />
            )}
          />
        </Switch>
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

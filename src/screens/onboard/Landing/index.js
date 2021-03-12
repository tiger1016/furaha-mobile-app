import React, {useState, useRef} from 'react';
import {
  Layout,
  Text,
  Icon,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Animated, Easing, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {withAnchorPoint} from 'react-native-anchor-point';
import Back from '../../../assets/svg/onboard-back.svg';
import themeStyles from './style';
import Step11 from '../../../assets/svg/onboard-step1-1.svg';
import Step12 from '../../../assets/svg/onboard-step1-2.svg';
import Step2 from '../../../assets/svg/onboard-step2.svg';
import Step3 from '../../../assets/svg/onboard-step3.svg';
import Step41 from '../../../assets/svg/onboard-step4-1.svg';
import Step42 from '../../../assets/svg/onboard-step4-2.svg';

const Landing = ({...props}) => {
  const styles = useStyleSheet(themeStyles);
  const evaTheme = useTheme();
  const [step, setStep] = useState(0);
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
    Step11: () =>
      withAnchorPoint(
        {
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange:
                  step === 0
                    ? ['0deg', '0deg']
                    : step === 1
                    ? ['0deg', '90deg']
                    : ['90deg', '90deg'],
              }),
            },
          ],
        },
        {x: 1, y: 0},
        {width: 952.303, height: 766.957},
      ),
    Step12: () => ({
      opacity: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: step === 0 ? [1, 1] : step === 1 ? [1, 0] : [0, 0],
      }),
    }),
    Step2: () => ({
      opacity: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          step === 0
            ? [0, 0]
            : step === 1
            ? [0, 1]
            : step === 2
            ? [1, 0]
            : [0, 0],
      }),
    }),
    Step3: () => ({
      transform: [
        {
          scale: spinValue.interpolate({
            inputRange: [0, 1],
            outputRange:
              step === 0 || step === 1
                ? [0, 0]
                : step === 2
                ? [0.3, 1]
                : [1, 1],
          }),
        },
      ],
      opacity: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange:
          step === 0 || step === 1 ? [0, 0] : step === 2 ? [0, 1] : [1, 0],
      }),
    }),
    Step41: () =>
      withAnchorPoint(
        {
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: step === 3 ? ['-90deg', '0deg'] : ['0deg', '0deg'],
              }),
            },
            {
              translateY: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: step === 3 ? [-160, 0] : [0, 0],
              }),
            },
            {
              translateX: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: step === 3 ? [50, 0] : [0, 0],
              }),
            },
          ],
        },
        {x: 1, y: 1},
        {width: 158.385, height: 255.293},
      ),
    Step411: () => ({
      opacity: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: step === 3 ? [1, 1] : [0, 0],
      }),
    }),
    Step42: () => ({
      opacity: spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: step === 3 ? [0, 1] : [0, 0],
      }),
    }),
  };

  const onNext = () => {
    if (step === 3) {
      props.history.push('/welcome');
    } else {
      setStep((step) => (step < 3 ? step + 1 : step));
      animation(400, Easing.linear);
    }
  };

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        {step !== 0 && (
          <Layout
            style={{
              position: 'absolute',
              alignItems: 'center',
              width: '100%',
              marginTop: 70,
            }}>
            <Image
              source={require('../../../assets/img/logo.png')}
              style={{width: 100, height: 30}}
            />
          </Layout>
        )}
        <Layout
          style={{
            position: 'absolute',
            zIndex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
          }}>
          <SvgXml style={{top: -20}} xml={Back} />
        </Layout>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '55%',
            ...dynamicStyles.Step11(),
          }}>
          <SvgXml xml={Step11} />
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
            ...dynamicStyles.Step12(),
          }}>
          <SvgXml xml={Step12} style={{top: -50}} />
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '55%',
            ...dynamicStyles.Step2(),
          }}>
          <SvgXml xml={Step2} style={{top: -50}} />
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
            ...dynamicStyles.Step3(),
          }}>
          <SvgXml xml={Step3} style={{top: -50}} />
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
            ...dynamicStyles.Step41(),
            ...dynamicStyles.Step411(),
          }}>
          <SvgXml xml={Step41} />
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 1,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
            ...dynamicStyles.Step42(),
          }}>
          <SvgXml xml={Step42} style={{top: -50}} />
        </Animated.View>
        <Layout style={styles.textContainer}>
          <Text style={styles.title} category="h6">
            Furaha Services on the Go
          </Text>
          <Text category="p1" style={styles.content}>
            Everything that you need to get to make you beautiful and amazing in
            one app. Quick services on the go
          </Text>
          {step !== 0 && (
            <Layout style={styles.skip}>
              <Layout style={styles.skipContainer}>
                <Layout style={styles.skipItem}></Layout>
                <Layout
                  style={[
                    styles.skipItem,
                    {
                      backgroundColor:
                        step === 2 || step === 3
                          ? evaTheme['color-warning-500']
                          : evaTheme['color-basic-900'],
                    },
                  ]}></Layout>
                <Layout
                  style={[
                    styles.skipItem,
                    {
                      backgroundColor:
                        step === 3
                          ? evaTheme['color-warning-500']
                          : evaTheme['color-basic-900'],
                    },
                  ]}></Layout>
              </Layout>
              <TouchableOpacity onPress={() => props.history.push('/welcome')}>
                <Text category="p1" style={{textAlign: 'center'}}>
                  Skip
                </Text>
              </TouchableOpacity>
            </Layout>
          )}
        </Layout>
        <TouchableOpacity
          onPress={onNext}
          style={{alignItems: 'flex-end', paddingHorizontal: 10}}>
          <Icon name="chevron-right-outline" fill="white" style={styles.icon} />
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default Landing;

import React, {useEffect} from 'react';
import {
  Button,
  Layout,
  Text,
  Icon,
  useStyleSheet,
  useTheme,
  Input,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';
import {Animated, Easing, Image} from 'react-native';
import {useAppTheme} from '../../../services/context';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      duration: 300,
      toValue: 1,
      easing: Easing.exp,
      useNativeDriver: false,
    }).start();
  };

  const theme = useAppTheme();
  const evaTheme = useTheme();

  useEffect(() => {
    animation();
  }, []);

  return (
    <Animated.View
      style={[
        styles.backContainer,
        {
          backgroundColor: spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: [
              evaTheme['color-basic-800'],
              evaTheme['color-warning-100'],
            ],
          }),
        },
      ]}>
      <Animated.Image
        source={require('../../../assets/img/first.png')}
        style={[
          styles.outContainer,
          {
            height: spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: [layout.height / 2, layout.height / 3],
            }),
            borderBottomRightRadius: spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: [layout.width - 130, layout.width - 300],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            height: spinValue.interpolate({
              inputRange: [0, 1],
              outputRange: [layout.height / 2, layout.height / 2 + 70],
            }),
          },
        ]}>
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
        <Text category="h3" style={{letterSpacing: 1}}>
          Sign In
        </Text>
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Email Address"
            style={{
              borderWidth: 0,
              borderColor: 'white',
              borderBottomColor: evaTheme['color-basic-500'],
            }}
          />
          <Input placeholder="Password" />
          <Button
            size="giant"
            status="primary"
            style={{width: 150, marginTop: 20}}
            onPress={() => props.history.push('/login')}>
            <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
              Login
            </Text>
          </Button>
          <TouchableOpacity style={{marginTop: 20}}>
            <Text
              category="s1"
              status="warning"
              style={{textDecorationLine: 'underline'}}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 40}}>
            <Text category="p1" style={{fontWeight: '600'}}>
              New User? Create an account
            </Text>
          </TouchableOpacity>
        </Layout>
      </Animated.View>
    </Animated.View>
  );
};

function mapStateToProps(state) {
  return {
    layout: state.layout,
  };
}

export default connect(mapStateToProps)(BookingStep);

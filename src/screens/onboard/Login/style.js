import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleService.create({
  backContainer: {
    flex: 1,
  },
  outContainer: {
    position: 'absolute',
    height: height / 3,
    width: width,
    zIndex: 1,
  },
  innerContainer: {
    position: 'absolute',
    borderTopRightRadius: 350,
    backgroundColor: '#FFF',
    height: (height * 2) / 3 - 70,
    bottom: 0,
    width: width + 80,
    justifyContent: 'space-between',
    paddingBottom: 50,
    paddingHorizontal: 40,
    paddingRight: 120,
    borderColor: '#00000012',
    borderWidth: 1,
    shadowColor: '#00000014',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  logoContainer: {
    top: -50,
    height: 35,
    width: 110,
  },
  btn: {
    backgroundColor: 'color-basic-800',
    borderColor: 'color-basic-800',
  },
  textContainer: {
    paddingHorizontal: 55,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 20,
  },
  content: {
    textAlign: 'center',
    lineHeight: 25,
    letterSpacing: 1,
  },
  skipContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 40,
    marginBottom: 20,
    marginTop: 50,
  },
  skipItem: {
    height: 8,
    width: width / 6,
    borderRadius: 10,
  },
  skipItemActive: {
    height: 8,
    width: width / 6,
    borderRadius: 10,
    backgroundColor: 'color-warning-500',
  },
  skip: {
    backgroundColor: 'transparent',
  },
  icon: {
    width: 40,
    height: 40,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#00000064',
    shadowRadius: 3,
  },
});

export default styles;

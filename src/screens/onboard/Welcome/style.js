import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleService.create({
  backContainer: {
    flex: 1,
  },
  outContainer: {
    position: 'absolute',
    width: width,
    zIndex: 1,
  },
  innerContainer: {
    position: 'absolute',
    borderTopRightRadius: 350,
    backgroundColor: '#FFF',
    bottom: 0,
    width: width + 100,
    paddingBottom: 50,
    paddingHorizontal: 50,
    paddingRight: 90,
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
    marginTop: 80,
  },
  desc: {
    marginTop: 30,
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
  titleWrapper: {
    zIndex: 3,
    position: 'absolute',
    height: height / 3,
    paddingHorizontal: 60,
    justifyContent: 'center',
  },
  titleStepWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  titleStep: {
    borderRadius: 10,
    width: 10,
    height: 10,
    marginRight: 5,
    backgroundColor: '#FFF',
  },
});

export default styles;

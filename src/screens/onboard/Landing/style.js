import {StyleService} from '@ui-kitten/components';

import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleService.create({
  outContainer: {
    flex: 1,
    backgroundColor: 'color-warning-500',
  },
  innerContainer: {
    borderBottomRightRadius: 250,
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  textContainer: {
    zIndex: 4,
    paddingTop: height / 2 + 20,
    paddingHorizontal: 45,
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
    marginTop: 5,
  },
  skipContainer: {
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
    backgroundColor: 'color-warning-500',
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

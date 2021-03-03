import {Dimensions, PixelRatio} from 'react-native';
const scale = Dimensions.get('window').width / 375;

function actuatedNormalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default {
  strict: {
    'text-font-family': 'OpenSans-Regular',

    'text-heading-1-font-size': actuatedNormalize(36),
    'text-heading-1-font-weight': '800',
    'text-heading-1-font-family': 'OpenSans-Bold',

    'text-heading-2-font-size': actuatedNormalize(16),
    'text-heading-2-font-weight': '800',
    'text-heading-2-font-family': 'OpenSans-Bold',

    'text-subtitle-1-font-size': actuatedNormalize(15),
    'text-subtitle-1-font-weight': '600',
    'text-subtitle-1-font-family': 'OpenSans-SemiBold',

    'text-paragraph-1-font-size': actuatedNormalize(15),
    'text-paragraph-1-font-weight': '400',
    'text-paragraph-1-font-family': 'OpenSans-Regular',

    'text-caption-1-font-size': actuatedNormalize(12),
    'text-caption-1-font-weight': '400',
    'text-caption-1-font-family': 'OpenSans-Regular',

    'text-label-font-size': actuatedNormalize(12),
    'text-label-font-weight': '800',
    'text-label-font-family': 'OpenSans-Bold',
  },
};
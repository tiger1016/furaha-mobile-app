import {StyleService} from '@ui-kitten/components';

import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleService.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 140,
    marginTop: 25,
    marginBottom: 35,
  },

  stepItem: {
    height: 8,
    width: width / 6,
    borderRadius: 10,
    backgroundColor: 'color-basic-900',
  },

  btnContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },

  btn: {
    height: 55,
    width: 55,
    borderRadius: 30,
    backgroundColor: 'color-basic-900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnInner: {
    borderRadius: 15,
    backgroundColor: 'white',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'color-basic-900',
    height: 21,
    width: 21,
  },
});

export default styles;

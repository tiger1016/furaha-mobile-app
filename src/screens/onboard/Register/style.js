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
    paddingRight: 10,
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

  codefieldRoot: {
    width: width - 100,
    paddingHorizontal: 20,
  },
  cellRoot: {
    width: (width - 200) / 6,
    height: (width - 200) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'color-basic-500',
    borderBottomWidth: 1,
  },
  focusCell: {
    borderBottomColor: 'color-basic-800',
    borderBottomWidth: 2,
  },
  cellText: {
    color: 'color-basic-800',
    fontWeight: '400',
  },
});

export default styles;

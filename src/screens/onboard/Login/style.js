import {StyleService} from '@ui-kitten/components';

const styles = StyleService.create({
  outContainer: {
    flex: 1,
    backgroundColor: 'color-warning-500',
  },
  innerContainer: {
    borderBottomRightRadius: 200,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});

export default styles;

import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {AsyncStorage} from 'react-native';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Project SU',
  })
  .useReactNative({
    networking: true,
    errors: true,
    asyncStorage: true,
  })
  .use(reactotronRedux())
  .connect();

export default reactotron;

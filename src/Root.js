import React, {useEffect} from 'react';
import {Layout} from '@ui-kitten/components';
import {Dimensions, UIManager, Platform, StatusBar} from 'react-native';
import {Switch, Route, withRouter} from 'react-router-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import objectAssign from 'object-assign';
import Spinner from 'react-native-loading-spinner-overlay';
import * as LayoutActions from './data/layout/actions';
import Landing from './screens/onboard/Landing';
import BookingStep from './screens/onboard/Landing/BookingStep';
import SocialStep from './screens/onboard/Landing/SocialStep';
import VirtualStep from './screens/onboard/Landing/VirtualStep';
import Welcome from './screens/onboard/Welcome';
import Login from './screens/onboard/Login';
import Register1 from './screens/onboard/Register1';
import Register2 from './screens/onboard/Register2';
import Register3 from './screens/onboard/Register3';

const Root = ({actions, waiting, ...props}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    let {width, height} = Dimensions.get('window');
    actions.setOrientation(width, height);

    Dimensions.addEventListener('change', (e) => {
      actions.setOrientation(e.window.width, e.window.height);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Layout style={{flex: 1}}>
        <Spinner
          textContent="Loading..."
          textStyle={{color: '#FFF'}}
          visible={!waiting}
        />
        <Route exact path={'/'} component={Landing} />
        <Route exact path={'/step1'} component={BookingStep} />
        <Route exact path={'/step2'} component={SocialStep} />
        <Route exact path={'/step3'} component={VirtualStep} />
        <Route exact path={'/welcome'} component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register1} />
        <Route path="/register/step1" component={Register2} />
        <Route path="/register/step2" component={Register3} />

        {/* <Route path="/onboarding" component={OnBoarding} />
        <Route path="/onboarding/photo" component={AddPhoto} />
        <Route path="/onboarding/biobrief" component={AddBioBrief} />
        <Route path="/onboarding/username" component={AddUserName} />
        <Route path="/onboarding/interest" component={AddInterest} />

        <Route path="/onboarding/invite" component={Invite} />
        <Route path="/onboarding/lookfor" component={Lookfor} /> */}
      </Layout>
    </>
  );
};

function mapStateToProps(state) {
  return {
    waiting: state.auth.waiting,
  };
}

function mapDispatchToProps(dispatch) {
  const combinedActions = objectAssign({}, LayoutActions);

  return {
    actions: bindActionCreators(combinedActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
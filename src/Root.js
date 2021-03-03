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

const Root = ({actions, waiting}) => {
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
        <Switch style={{flex: 1}}>
          <Route exact path="/" component={Landing} />
          {/* <Route path="/onboarding/service/step1" component={Service1} />
          <Route path="/onboarding/service/step2" component={Service2} />
          <Route path="/onboarding/service/step3" component={Service3} />
          <Route path="/onboarding/service/start" component={GetStarted} />
          <Route path="/onboarding/service/invite" component={Invite} />
          <Route path="/onboarding/welcome" component={Welcome} />
          <Route path="/onboarding/login" component={Login} />
          <Route path="/onboarding/register/step1" component={Register1} />
          <Route path="/onboarding/register/step2" component={Register2} />
          <Route path="/onboarding/register/step3" component={Register3} />
          <Route path="/onboarding/profile/chooserole" component={AddRole} />
          <Route path="/onboarding/profile/photo" component={AddPhoto} />
          <Route path="/onboarding/profile/interest" component={AddInterest} />
          <Route path="/onboarding/profile/biobrief" component={AddBioBrief} />
          <Route path="/onboarding/profile/username" component={AddUserName} />
          <Route path="/onboarding/profile/finish" component={ProfileFinish} />
          <Route path="/onboarding/social" component={Social} />
          <Route path="/onboarding/social/go" component={onBoarding} /> */}
        </Switch>
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

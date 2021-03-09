import React, {useState} from 'react';
import {
  Button,
  Layout,
  Text,
  Icon,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as yup from 'yup';
import Input from '../../global/input';
import themeStyles from './style';
import {actuatedNormalize} from '../../../theme/mapping';

const schema = yup.object().shape({
  email: yup.string().required('Required').email('Invalid Email!'),
  name: yup
    .string()
    .required('Required')
    .min(2, 'Should be at least 2 characters'),
});

const Register1 = ({...props}) => {
  const styles = useStyleSheet(themeStyles);
  const evaTheme = useTheme();

  const [errors, setErrors] = useState({});

  const changeName = (text) => {
    console.log(text);
  };

  const changeEmail = (email) => {
    console.log(email);
  };

  return (
    <Layout style={{flex: 1}}>
      <Layout style={styles.stepContainer}>
        <Layout
          style={[
            styles.stepItem,
            {backgroundColor: evaTheme['color-success-900']},
          ]}></Layout>
        <Layout style={styles.stepItem}></Layout>
        <Layout style={styles.stepItem}></Layout>
      </Layout>
      <Text category="h3" style={{letterSpacing: 1, marginLeft: 8}}>
        Sign Up
      </Text>
      <Layout style={{marginTop: 30}}>
        <Input
          placeholder="Full Name"
          error={errors.name}
          onChangeText={changeName}
        />
        <Input
          placeholder="Email Address"
          error={errors.email}
          onChangeText={changeEmail}
        />
      </Layout>
      <Layout style={styles.btnContainer}>
        <TouchableOpacity>
          <Layout style={styles.btn}>
            <Layout style={styles.btnInner}>
              <Icon pack="font-awesome" name="arrow-left" style={styles.icon} />
            </Layout>
          </Layout>
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 15}}>
          <Layout style={styles.btn}>
            <Layout style={styles.btnInner}>
              <Icon
                pack="font-awesome"
                name="arrow-right"
                style={styles.icon}
              />
            </Layout>
          </Layout>
        </TouchableOpacity>
      </Layout>
      <Layout style={{marginTop: 40}}>
        <TouchableOpacity onPress={() => props.history.push('/welcome/signin')}>
          <Text category="s1" style={{fontSize: actuatedNormalize(15)}}>
            Already a user? Sign in
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    width: state.layout.width,
  };
}

export default withRouter(connect(mapStateToProps)(Register1));

import React, {useState} from 'react';
import {
  Button,
  Layout,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withRouter} from 'react-router-native';
import * as yup from 'yup';
import Input from '../../global/input';
import themeStyles from './style';
import {actuatedNormalize} from '../../../theme/mapping';
import {Easing} from 'react-native';

const schema = yup.object().shape({
  password: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid Email!'),
});

const Login = ({setSw, animation, setStep, ...props}) => {
  const styles = useStyleSheet(themeStyles);
  const evaTheme = useTheme();

  const [forms, setForms] = useState({});
  const [errors, setErrors] = useState({});

  const changeEmail = (email) => {
    setForms((form) => ({
      ...form,
      email,
    }));
  };

  const changePassword = (password) => {
    setForms((form) => ({
      ...form,
      password,
    }));
  };

  const login = () => {
    schema
      .validate(forms)
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        setErrors({
          [err.path]: err.message,
        });
      });
  };
  return (
    <Layout style={[styles.backContainer]}>
      <Text category="h3" style={{letterSpacing: 1, marginLeft: 8}}>
        Sign In
      </Text>
      <Layout style={{marginTop: 25}}>
        <Input
          placeholder="Email Address"
          error={errors.email}
          onChangeText={changeEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          error={errors.password}
          onChangeText={changePassword}
        />
        <Button
          size="giant"
          status="primary"
          style={{width: 150, marginTop: 20}}
          onPress={login}>
          <Text style={{letterSpacing: 1, color: 'white'}} category="s1">
            Login
          </Text>
        </Button>
        <TouchableOpacity style={{marginTop: 20}}>
          <Text
            category="s1"
            status="warning"
            style={{textDecorationLine: 'underline'}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 40}}
          onPress={() => {
            setStep(0);
            setSw(1);
            animation(300, Easing.cubic);
            props.history.push('/welcome/signup');
          }}>
          <Text category="s1" style={{fontSize: actuatedNormalize(15)}}>
            New User? Create an account
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default withRouter(Login);

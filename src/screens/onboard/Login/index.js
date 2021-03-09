import React, {useState} from 'react';
import {
  Button,
  Layout,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as yup from 'yup';
import Input from '../../global/input';
import themeStyles from './style';
import {actuatedNormalize} from '../../../theme/mapping';

const emailSchema = yup.string().required('Required').email('Invalid Email!');

const Login = ({...props}) => {
  const styles = useStyleSheet(themeStyles);
  const evaTheme = useTheme();

  const [errors, setErrors] = useState({});

  const changeEmail = (txt) => {};

  const changePassword = (txt) => {
    console.log(txt);
  };

  const login = () => {
    // emailSchema
    //   .validate(txt)
    //   .then(() => [])
    //   .catch(err);
  };

  return (
    <Layout style={[styles.backContainer]}>
      <Text category="h3" style={{letterSpacing: 1}}>
        Sign In
      </Text>
      <Layout style={{marginTop: 20}}>
        <Input
          placeholder="Email Address"
          error={errors.email}
          onChangeText={changeEmail}
        />
        <Input
          type="password"
          placeholder="Password"
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
          onPress={() => props.history.push('/welcome/signup/step1')}>
          <Text category="s1" style={{fontSize: actuatedNormalize(15)}}>
            New User? Create an account
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default Login;

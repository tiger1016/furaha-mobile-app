import React, {useState} from 'react';
import {
  Button,
  Layout,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as yup from 'yup';
import Input from '../../global/input';
import themeStyles from './style';

const emailSchema = yup.string().required('Required').email('Invalid Email!');

const Login = ({layout, ...props}) => {
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
        <TouchableOpacity style={{marginTop: 40}}>
          <Text category="p1" style={{fontWeight: '600'}}>
            New User? Create an account
          </Text>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    layout: state.layout,
  };
}

export default connect(mapStateToProps)(Login);

import React, {useEffect} from 'react';
import {
  Button,
  Layout,
  Text,
  useStyleSheet,
  useTheme,
  Input,
} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomInput = ({layout, ...props}) => {
  const styles = useStyleSheet(themeStyles);
  const evaTheme = useTheme();

  return (
    <Layout style={[styles.backContainer]}>
      <Text category="h3" style={{letterSpacing: 1}}>
        Sign In
      </Text>
      <Layout style={{marginTop: 20}}>
        <Input
          placeholder="Email Address"
          style={{
            borderWidth: 0,
            borderColor: 'white',
            borderBottomColor: evaTheme['color-basic-500'],
          }}
        />
        <Input placeholder="Password" />
        <Button
          size="giant"
          status="primary"
          style={{width: 150, marginTop: 20}}>
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

export default connect(mapStateToProps)(CustomInput);

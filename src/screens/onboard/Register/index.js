import React, {useState, useEffect} from 'react';
import {
  Layout,
  Text,
  Icon,
  useStyleSheet,
  useTheme,
  Button,
} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-native';
import {Easing} from 'react-native';
import {bindActionCreators} from 'redux';
import * as yup from 'yup';
import Input from '../../global/input';
import themeStyles from './style';
import {actuatedNormalize} from '../../../theme/mapping';
import {changeRegistrationForm} from '../../../data/register/actions';
import ConfirmCode from './ConfirmCode';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = [
  yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid Email!'),
    name: yup
      .string()
      .required('Full Name is required')
      .min(2, 'Should be at least 2 characters'),
  }),
  yup.object({
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Invalid phone number'),
  }),
  ,
  yup.object({
    password: yup.string().required('Password is required'),
    confirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
];

const Register = ({
  setSw,
  animation,
  step,
  setStep,
  registrationForm,
  actions,
  ...props
}) => {
  const styles = useStyleSheet(themeStyles);
  const evaTheme = useTheme();

  const Phone = (props) => (
    <Icon
      {...props}
      pack="material"
      name="call"
      style={{color: evaTheme['color-basic-800'], width: 30, height: 25}}
    />
  );

  const Security = (props) => (
    <Icon
      {...props}
      pack="material"
      name="security"
      style={{color: evaTheme['color-basic-800'], width: 30, height: 30}}
    />
  );
  const [errors, setErrors] = useState({});
  const [code, setCode] = useState('');

  const onChangeText = (label, text) => {
    actions({
      [label]: text,
    });
  };

  const onPrev = () => {
    setStep((s) => {
      let res = s > 0 ? s - 1 : 0;
      return res;
    });
  };

  const onNext = () => {
    if (step !== 2) {
      schema[step]
        .validate(registrationForm)
        .then(() => {
          setStep((s) => {
            if (s === 3) {
              console.log('register');
              return 0;
            }

            let res = s < 3 ? s + 1 : s;
            return res;
          });
        })
        .catch((err) => {
          setErrors({
            [err.path]: err.message,
          });
        });
    } else {
      console.log('here');
      setStep((s) => (s < 3 ? s + 1 : s));
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      onNext();
    }
  }, [code]);

  return (
    <Layout style={{flex: 1}}>
      <Layout style={styles.stepContainer}>
        <Layout
          style={[
            styles.stepItem,
            {backgroundColor: evaTheme['color-success-900']},
          ]}></Layout>
        <Layout
          style={[
            styles.stepItem,
            {
              backgroundColor:
                step === 1 || step === 2 || step === 3
                  ? evaTheme['color-success-900']
                  : evaTheme['color-basic-900'],
            },
          ]}></Layout>
        <Layout
          style={[
            styles.stepItem,
            {
              backgroundColor:
                step === 3
                  ? evaTheme['color-success-900']
                  : evaTheme['color-basic-900'],
            },
          ]}></Layout>
      </Layout>
      <Text category="h3" style={{letterSpacing: 1, marginLeft: 8}}>
        Sign Up
      </Text>
      <Layout style={{marginTop: 25}}>
        {step === 0 ? (
          <>
            <Input
              placeholder="Full Name"
              value={registrationForm.name}
              error={errors.name}
              onChangeText={(text) => onChangeText('name', text)}
            />
            <Input
              placeholder="Email Address"
              value={registrationForm.email}
              error={errors.email}
              onChangeText={(text) => onChangeText('email', text)}
            />
          </>
        ) : step === 1 ? (
          <>
            <Input
              placeholder="+41 Mobile Number"
              value={registrationForm.phone}
              leftIcon={Phone}
              error={errors.phone}
              onChangeText={(text) => onChangeText('phone', text)}
            />
            <Text
              category="p1"
              status="warning"
              style={{marginLeft: 8, marginTop: 10, marginBottom: 30}}>
              6 digit pin would be sent to your Mobile
            </Text>
          </>
        ) : step === 2 ? (
          <Layout
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 50,
              alignItems: 'center',
            }}>
            <Security />
            <ConfirmCode value={code} setValue={setCode} />
          </Layout>
        ) : (
          <>
            <Input
              type="password"
              placeholder="Password"
              value={registrationForm.password}
              error={errors.password}
              onChangeText={(text) => onChangeText('password', text)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={registrationForm.confirm}
              error={errors.confirm}
              onChangeText={(text) => onChangeText('confirm', text)}
            />
          </>
        )}
      </Layout>
      {step === 2 && (
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 45,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              onPrev();
              setCode('');
            }}>
            <Text
              category="p2"
              style={{
                textDecorationLine: 'underline',
                color: evaTheme['color-basic-700'],
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}}>
            <Text
              category="p2"
              style={{
                textDecorationLine: 'underline',
                color: evaTheme['color-basic-700'],
              }}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </Layout>
      )}
      {step !== 2 && (
        <Layout
          style={[
            styles.btnContainer,
            {justifyContent: step === 3 ? 'space-between' : 'flex-start'},
          ]}>
          <TouchableOpacity onPress={onPrev}>
            <Layout style={styles.btn}>
              <Layout style={styles.btnInner}>
                <Icon
                  pack="font-awesome"
                  name="arrow-left"
                  style={styles.icon}
                />
              </Layout>
            </Layout>
          </TouchableOpacity>

          {step === 3 ? (
            <Button
              size="giant"
              status="primary"
              style={{width: 130}}
              onPress={onNext}>
              <Text category="s1" style={{color: 'white', letterSpacing: 1}}>
                Done
              </Text>
            </Button>
          ) : (
            <TouchableOpacity style={{marginLeft: 15}} onPress={onNext}>
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
          )}
        </Layout>
      )}
      <Layout style={{marginTop: 40}}>
        <TouchableOpacity
          onPress={() => {
            setSw(2);
            animation(300, Easing.cubic);
            props.history.push('/welcome/signin');
          }}>
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
    registrationForm: state.registrationForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: changeRegistrationForm,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register),
);

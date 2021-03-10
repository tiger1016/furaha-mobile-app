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
import {bindActionCreators} from 'redux';
import * as yup from 'yup';
import Input from '../../global/input';
import themeStyles from './style';
import {actuatedNormalize} from '../../../theme/mapping';
import {changeRegistrationForm} from '../../../data/auth/actions';

const schema = yup.object().shape({
  email: yup.string().required('Required').email('Invalid Email!'),
  name: yup
    .string()
    .required('Required')
    .min(2, 'Should be at least 2 characters'),
});

const formTemplate = [
  [
    {
      placeholder: 'Full Name',
      label: 'name',
      value: '',
    },
    {
      placeholder: 'Email Address',
      label: 'email',
      value: '',
    },
  ],
  [
    {
      placeholder: '+41 Mobile Number',
      label: 'phone',
      value: '',
    },
    {
      placeholder: 'Where did you get to find out Furaha',
      label: 'findout',
      value: '',
    },
  ],
  [
    {
      placeholder: 'Password',
      label: 'password',
      value: '',
    },
    {
      placeholder: 'Confirm Password',
      label: 'confirm',
      value: '',
    },
  ],
];

const Register = ({registrationForm, ...props}) => {
  const styles = useStyleSheet(themeStyles);
  const [step, setStep] = useState(0);
  const evaTheme = useTheme();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(formTemplate);

  const changeFirst = (text) => {
    switch (step) {
      case 0:
      case 1:
        break;
      case 2:
        break;
    }
  };

  const changeSecond = (email) => {
    console.log(email);
  };

  const onPrev = () => {
    setStep((step) => (step > 0 ? step - 1 : 0));
  };

  const onNext = () => {
    setStep((step) => (step < 2 ? step + 1 : step));
  };

  const onDone = () => {};

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
                step === 1 || step === 2
                  ? evaTheme['color-success-900']
                  : evaTheme['color-basic-900'],
            },
          ]}></Layout>
        <Layout
          style={[
            styles.stepItem,
            {
              backgroundColor:
                step === 2
                  ? evaTheme['color-success-900']
                  : evaTheme['color-basic-900'],
            },
          ]}></Layout>
      </Layout>
      <Text category="h3" style={{letterSpacing: 1, marginLeft: 8}}>
        Sign Up
      </Text>
      <Layout style={{marginTop: 30}}>
        <Input
          placeholder={form[step][0].placeholder}
          value={form[step][0].value}
          error={errors.name}
          onChangeText={changeFirst}
        />
        <Input
          placeholder={form[step][1].placeholder}
          value={form[step][1].value}
          error={errors.email}
          onChangeText={changeSecond}
        />
      </Layout>
      <Layout
        style={[
          styles.btnContainer,
          {justifyContent: step === 2 ? 'space-between' : 'flex-start'},
        ]}>
        <TouchableOpacity onPress={onPrev}>
          <Layout style={styles.btn}>
            <Layout style={styles.btnInner}>
              <Icon pack="font-awesome" name="arrow-left" style={styles.icon} />
            </Layout>
          </Layout>
        </TouchableOpacity>

        {step === 2 ? (
          <Button
            size="giant"
            status="primary"
            style={{width: 130}}
            onPress={onDone}>
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
    registrationForm: state.registrationForm,
  };
}

export default connect(mapStateToProps)(Register);

import React, {useState} from 'react';
import {Text, useTheme, Input, Icon} from '@ui-kitten/components';
import {connect} from 'react-redux';

const AlertIcon = (props) => {
  const evaTheme = useTheme();

  return (
    <Icon
      {...props}
      name="alert-circle-outline"
      fill={evaTheme['color-danger-500']}
    />
  );
};

const CustomInput = ({placeholder, error, onChangeText, type, ...props}) => {
  const evaTheme = useTheme();

  const onChange = (text) => {
    onChangeText(text);
  };

  return (
    <Input
      status="basic"
      placeholder={placeholder}
      secureTextEntry={type === 'password' ? true : false}
      caption={() => (
        <Text category="c1" status="danger">
          {error}
        </Text>
      )}
      captionIcon={error ? AlertIcon : null}
      textStyle={{
        paddingBottom: 10,
        marginLeft: 0,
      }}
      style={{
        borderRadius: 0,
        borderColor: 'white',
        borderBottomColor: evaTheme['color-basic-500'],
      }}
      onChangeText={onChange}
    />
  );
};

function mapStateToProps(state) {
  return {
    layout: state.layout,
  };
}

export default connect(mapStateToProps)(CustomInput);

import React from 'react';
import {Button, Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';

const Register2 = ({}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Text style={styles.text} appearance="hint">
          For example, try changing theme to Dark by using eva.dark Register2
        </Text>
      </Layout>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    width: state.layout.width,
  };
}

export default connect(mapStateToProps)(Register2);

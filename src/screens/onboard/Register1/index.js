import React from 'react';
import {Button, Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {connect} from 'react-redux';
import themeStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Register1 = ({navigation}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register2')}>
          <Text style={styles.text} appearance="hint">
            For example, try changing theme to Dark by using eva.dark Register1
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

export default connect(mapStateToProps)(Register1);

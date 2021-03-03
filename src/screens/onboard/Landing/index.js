import React from 'react';
import {Button, Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {withRouter} from 'react-router-native';
import {connect} from 'react-redux';
import Config from 'react-native-config';
import Wrapper from '../../global/screenwraper';
import themeStyles from './style';

const HeartIcon = (props) => <Icon {...props} name="heart" />;

const Landing = ({}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    // <Wrapper>
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Text style={styles.text} category="h1">
          Welcome to {Config.API_BASE}
        </Text>
        <Text style={styles.text} category="s1">
          Start with editing App.js to configure your App
        </Text>
        <Text style={styles.text} appearance="hint">
          For example, try changing theme to Dark by using eva.dark
        </Text>
        <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
          LIKE
        </Button>
      </Layout>
    </Layout>
    // </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    width: state.layout.width,
  };
}

export default withRouter(connect(mapStateToProps)(Landing));

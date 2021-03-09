import React from 'react';
import {Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import themeStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Landing = ({...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Layout style={styles.textContainer}>
          <Text style={styles.title} category="h6">
            Furaha Services on the Go
          </Text>
          <Text style={styles.content} category="p1">
            Everything that you need to get to make you beautiful and amazing in
            one app. Quick services on the go
          </Text>
        </Layout>
        <TouchableOpacity
          onPress={() => props.history.push('/step1')}
          style={{alignItems: 'flex-end', paddingHorizontal: 10}}>
          <Icon name="chevron-right-outline" fill="white" style={styles.icon} />
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default Landing;

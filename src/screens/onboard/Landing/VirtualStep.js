import React from 'react';
import {Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import themeStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

const VirtualStep = ({...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Layout style={styles.textContainer}>
          <Text style={styles.title} category="h6">
            New: Virtual Services
          </Text>
          <Text style={styles.content} category="p1">
            Never miss out on your favorite bookies or shapers. Follow their
            updates and get latest info
          </Text>
          <Layout style={styles.skip}>
            <Layout style={styles.skipContainer}>
              <Layout style={styles.skipItemActive}></Layout>
              <Layout style={styles.skipItemActive}></Layout>
              <Layout style={styles.skipItemActive}></Layout>
            </Layout>
            <TouchableOpacity onPress={() => props.history.push('/welcome')}>
              <Text category="p1" style={{textAlign: 'center'}}>
                Skip
              </Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
        <TouchableOpacity
          onPress={() => props.history.push('/welcome')}
          style={{alignItems: 'flex-end', paddingHorizontal: 10}}>
          <Icon name="chevron-right-outline" fill="white" style={styles.icon} />
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default VirtualStep;

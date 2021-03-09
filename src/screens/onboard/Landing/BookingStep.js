import React from 'react';
import {Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import themeStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BookingStep = ({...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Layout style={styles.textContainer}>
          <Text style={styles.title} category="h6">
            Find awesome bookings
          </Text>
          <Text style={styles.content} category="p1">
            Secured payment and ease. Get awesome bookings to your doorstep or
            take a stroll out to your beauty
          </Text>
          <Layout style={styles.skip}>
            <Layout style={styles.skipContainer}>
              <Layout style={styles.skipItemActive}></Layout>
              <Layout style={styles.skipItem}></Layout>
              <Layout style={styles.skipItem}></Layout>
            </Layout>
            <TouchableOpacity onPress={() => props.history.push('/welcome')}>
              <Text category="p1" style={{textAlign: 'center'}}>
                Skip
              </Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
        <TouchableOpacity
          onPress={() => props.history.push('/step2')}
          style={{alignItems: 'flex-end', paddingHorizontal: 10}}>
          <Icon name="chevron-right-outline" fill="white" style={styles.icon} />
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default BookingStep;

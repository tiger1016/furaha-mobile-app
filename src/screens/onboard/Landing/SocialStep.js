import React from 'react';
import {Image} from 'react-native';
import {Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import themeStyles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import Back from '../../../assets/svg/onboard-back.svg';
import Step3 from '../../../assets/svg/onboard-step3.svg';

const SocialStep = ({...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Layout
          style={{
            position: 'absolute',
            alignItems: 'center',
            width: '100%',
            marginTop: 70,
          }}>
          <Image
            source={require('../../../assets/img/logo.png')}
            style={{width: 100, height: 30}}
          />
        </Layout>
        <Layout
          style={{
            zIndex: 1,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
          }}>
          <SvgXml style={{top: -20}} xml={Back} />
        </Layout>
        <Layout
          style={{
            zIndex: 2,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '50%',
          }}>
          <SvgXml xml={Step3} />
        </Layout>
        <Layout style={styles.textContainer}>
          <Text style={styles.title} category="h6">
            New: Furaha Socials
          </Text>
          <Text style={styles.content} category="p1">
            Never miss out on your favorite bookies or shapers. Follow their
            updates and get latest info
          </Text>
          <Layout style={styles.skip}>
            <Layout style={styles.skipContainer}>
              <Layout style={styles.skipItemActive}></Layout>
              <Layout style={styles.skipItemActive}></Layout>
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
          onPress={() => props.history.push('/step3')}
          style={{alignItems: 'flex-end', paddingHorizontal: 10}}>
          <Icon name="chevron-right-outline" fill="white" style={styles.icon} />
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

export default SocialStep;

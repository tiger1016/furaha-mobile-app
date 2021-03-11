import React from 'react';
import {Layout, Text, Icon, useStyleSheet} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import themeStyles from './style';
import {SvgXml} from 'react-native-svg';
import Back from '../../../assets/svg/onboard-back.svg';
import Step11 from '../../../assets/svg/onboard-step1-1.svg';
import Step12 from '../../../assets/svg/onboard-step1-2.svg';
import Step41 from '../../../assets/svg/onboard-step4-1.svg';
import Step42 from '../../../assets/svg/onboard-step4-2.svg';

const Landing = ({...props}) => {
  const styles = useStyleSheet(themeStyles);

  return (
    <Layout style={styles.outContainer}>
      <Layout style={styles.innerContainer}>
        <Layout
          style={{
            position: 'absolute',
            zIndex: 1,
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
            height: '55%',
          }}>
          <SvgXml xml={Step11} />
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
          <SvgXml xml={Step12} style={{top: -50}} />
        </Layout>
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

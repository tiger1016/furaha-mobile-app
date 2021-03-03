import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {withRouter} from 'react-router-native';
import {connect} from 'react-redux';

const Wrapper = ({width, direction, children}) => {
  const x = useRef(new Animated.Value(direction === 'right' ? -width : width))
    .current;
  const slide = () => {
    Animated.spring(x, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slide();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{translateX: x}],
      }}>
      {children}
    </Animated.View>
  );
};

function mapStateToProps(state) {
  return {
    width: state.layout.width,
  };
}

export default withRouter(connect(mapStateToProps)(Wrapper));

import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {connect} from 'react-redux';

const Wrapper = ({direction, children, ...props}) => {
  const x = useRef(
    new Animated.Value(direction === 'right' ? -props.width : props.width),
  ).current;

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

export default connect(mapStateToProps)(Wrapper);

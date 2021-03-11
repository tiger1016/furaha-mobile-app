import React from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Layout, useStyleSheet, Text} from '@ui-kitten/components';
import themeStyles from './style';

const ConfirmCode = ({value, setValue}) => {
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const styles = useStyleSheet(themeStyles);

  return (
    <CodeField
      ref={ref}
      value={value}
      onChangeText={setValue}
      cellCount={6}
      rootStyle={styles.codefieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Layout
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}>
          <Text category="h6" style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </Layout>
      )}
    />
  );
};

export default ConfirmCode;

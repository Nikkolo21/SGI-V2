import React from "react";
import { TextInput, View, Text } from "react-native";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputStyle}
      />
    </View>
  );
};
const styles = {
  inputStyle: {
    backgroundColor: '#E5ECFC',
    padding: 5
  },
  labelStyle: {
    height: 20,
  },
  containerStyle: {
    flexDirection: "column",
    flex: 1,
    fontSize: 18,
  }
};
export { Input };

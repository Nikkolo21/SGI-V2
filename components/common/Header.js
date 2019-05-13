import React from "react";
import { Text, View } from "react-native";
import colors from "../../util/Colors";

const Header = props => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    paddingTop: 15,
    elevation: 2,
    borderBottomWidth: 1,
    borderColor: "black",
    position: "relative"
  },
  textStyle: {
    fontSize: 20
  }
};

export { Header };

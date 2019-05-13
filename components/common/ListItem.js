import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { CardSection } from "./CardSection";
import colors from "../../util/Colors";

const ListItem = ({ title, onRowPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onRowPress}>
      <View>
        <CardSection>
          <Text style={styles.titleStyle}>{title}</Text>
        </CardSection>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: "blue"
  }
};
export { ListItem };

import React from "react";
import { Text, View, Modal } from "react-native";
import { CardSection } from "./CardSection";
import { Button } from "./Button";
import colors from "../../util/Colors";

const Confirm = ({ modalMessage, onAccept, onDecline, visible }) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {}}
      transparent
      visible={visible}
    >
      <View style={styles.containerStyle}>
        <CardSection style={styles.cardSectionStyle}>
          <Text style={styles.textStyle}>{modalMessage}</Text>
        </CardSection>
        <CardSection>
          <Button buttonText={"Yes"} whenPressed={onAccept} />
          <Button buttonText={"No"} whenPressed={onDecline} />
        </CardSection>
      </View>
    </Modal>
  );
};
const styles = {
  cardSectionStyle: {
    justifyContent: "center"
  },
  textStyle: {
    color: "black",
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40
  },
  containerStyle: {
    position: "relative",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center"
  }
};
export { Confirm };

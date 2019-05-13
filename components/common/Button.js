import React from "react";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../util/Colors";

const Button = ({ whenPressed, buttonText }) => {
    return (
        <TouchableOpacity onPress={whenPressed} style={styles.buttonStyles}>
            <Text style={styles.textStyle}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyles: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: colors.lightBlue,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
        marginLeft: 5,
        marginRight: 5,
    }
};

export { Button };

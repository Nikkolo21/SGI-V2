import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    errorTextStyle: {
        fontSize: 12,
        alignSelf: "center",
        color: "red"
    },
    stretch: { alignSelf: "center", width: 150, height: 150, marginBottom: 40 },
    View: { flex: 1, flexDirection: 'column', padding: 20 }
});

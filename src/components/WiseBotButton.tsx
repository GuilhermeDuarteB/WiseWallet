import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function WiseBotButton(){
    return(
        <View>
            <Pressable style = {style.Button} onPress={() => {
                console.log("WiseBotButton pressed");
            }}>
                 <Ionicons name="sparkles-outline" size={24} color="white" />
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({ 
    Button: {
        position: "absolute",
        bottom: 100,
        right: 16,
        backgroundColor: "#0521C2",
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        elevation: 10,
    }
})
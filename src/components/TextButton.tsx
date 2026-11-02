import { Pressable, TextStyle, View, ViewStyle, Text } from "react-native";


type textButtonProps = {
  titulo: string;
  onPress?: () => void;
  style?: TextStyle;
  buttonStyle?: ViewStyle;
};

export function TextButton ({titulo,onPress,buttonStyle,style} : textButtonProps){
    return(
        <View>
           <Pressable onPress={onPress} accessibilityRole={"button"} style={buttonStyle}>
                <Text style={style}>{titulo}</Text>
            </Pressable>  
        </View>
    )
}
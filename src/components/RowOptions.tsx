import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";

type RowOptionsProps = {
  titulo: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  iconColor?: string;
  rowStyle?: ViewStyle;
  icon2?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
};

export function RowOptions({
  titulo,
  description,
  icon,
  icon2,
  onPress,
  iconColor = "#000000",
  rowStyle,
  iconSize = 50,
}: RowOptionsProps) {
  return (
    <View style={[globalStyles.scrollView, { flex: 1 }]}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.typeRowBtn, rowStyle]}
          onPress={onPress}
        >
          {icon && (
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={iconSize} color={iconColor} />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.title}>{titulo}</Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>

          {icon2 && <Ionicons name={icon2} size={24} color={"black"} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 22,
  },
  typeRowBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: "#666666",
  },
});

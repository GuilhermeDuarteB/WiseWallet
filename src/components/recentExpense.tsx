import { View, Text, StyleSheet } from "react-native";

export function RecentExpense() {
  return (
    <View>
        <Text style={styles.expenseRow}> Despesas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    expenseRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "#E2EFFF",
        borderWidth: 1,
        borderRadius: 15,
    }
})
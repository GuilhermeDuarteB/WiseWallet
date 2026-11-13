import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";

import "../types/calendarLocale";

type SelectExpenseTypeProps = {
  onSelectExpense: () => void;
};

export function SelectExpenseType({ onSelectExpense }: SelectExpenseTypeProps) {
  return (
    <View style={[globalStyles.scrollView, { flex: 1 }]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.TypeRowBtn} onPress={onSelectExpense}>
          <View style={[styles.btnIcon, { backgroundColor: "#F59E0B" }]}>
            <Ionicons name="add-outline" size={30} color="white" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Nova Despesa</Text>
            <Text style={styles.subtitleText}>Registar um gasto</Text>
          </View>

          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#1B88DF"
            style={styles.chevron}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.TypeRowBtn}>
          <View style={[styles.btnIcon, { backgroundColor: "#9561D8" }]}>
            <Ionicons name="add-outline" size={30} color="white" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Despesa Recorrente</Text>
            <Text style={styles.subtitleText}>Agendar um Pagamento</Text>
          </View>

          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#1B88DF"
            style={styles.chevron}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.TypeRowBtn}>
          <View style={[styles.btnIcon, { backgroundColor: "#16A879" }]}>
            <Ionicons name="add-outline" size={30} color="white" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Nova Dívida</Text>
            <Text style={styles.subtitleText}>Valor a Pagar ou a Dever</Text>
          </View>

          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#1B88DF"
            style={styles.chevron}
          />
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

  TypeRowBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
    paddingVertical: 4,
  },

  btnIcon: {
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },

  titleText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2C47",
  },

  subtitleText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#8A9BB9",
  },

  chevron: {
    marginLeft: 8,
  },
});

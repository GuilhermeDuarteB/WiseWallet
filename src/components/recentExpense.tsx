import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {categories} from "../constants/categories";

const expense = [{
    id: 1,
    categoryId: "alimentacao",
    description: "Almoço no restaurante",
    amount: 50.00,
    date: "2023-06-15",
    
}, {
    id: 2,
    categoryId: "casa",
    description: "Compra de Cama",
    amount: 50.00,
    date: "2023-06-15",
},{
    id: 3,
    categoryId: "transportes",
    description: "Passe",
    amount: 40.00,
    date: "2026-06-15",
}]


export function RecentExpense() {
  return (
    <View>
      {expense.map((item) => {
        const category = categories.find(
          (category) => category.id === item.categoryId,
        );

        if (!category) return null;

        const valorFormato = new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(item.amount);

        return (
          <View key={item.id} style={styles.expenseRow}>
            {/* Ícone da categoria */}
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: category.color + "20" },
              ]}
            >
              <Ionicons
                name={category.icon as keyof typeof Ionicons.glyphMap}
                size={23}
                color={category.color}
              />
            </View>

            {/* Informação da despesa */}
            <View style={styles.expenseInfo}>
              <Text style={styles.description}>{item.description}</Text>

              <Text style={styles.subtitle}>
                {category.name} · {item.date}
              </Text>
            </View>

            {/* Valor */}
            <Text style={styles.amount}>-{valorFormato}</Text>
          </View>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  expenseRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    gap: 12,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  expenseInfo: {
    flex: 1,
    gap: 5,
  },

  description: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2C47",
  },

  subtitle: {
    fontSize: 11,
    color: "#8391AB",
  },

  amount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2C47",
  },
});
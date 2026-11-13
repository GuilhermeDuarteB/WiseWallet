import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { InitialScreen } from "./screens/(panel)/InitialScreen";
import { TransactionsScreen } from "./screens/(panel)/TransactionsScreen";
import { MoreScreen } from "./screens/(panel)/MoreScreen";
import { AddExpense } from "../components/AddExpense";
import { SelectExpenseType } from "../components/SelectExpenseType";

// Ecrãs temporários
function PlaceholderScreen({ titulo }: { titulo: string }) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.title}>{titulo}</Text>
    </View>
  );
}

function StatisticsScreen() {
  return <PlaceholderScreen titulo="Estatísticas" />;
}


// Por causa do botão de adicionar, o React precisa sempre de um ecrã
function EmptyScreen() {
  return null;
}

// Botão + com modal
function AddTabButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const insets = useSafeAreaInsets();

  function abrirModal() {
    setShowAddExpense(false);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    setShowAddExpense(false);
  }

  function abrirFormularioDespesa() {
    setShowAddExpense(true);
  }

  return (
    <>
      {/* Botão no menu */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Adicionar ao WiseWallet"
        onPress={abrirModal}
        style={styles.addTabButton}
      >
        <View style={styles.addButton}>
          <Ionicons name="add" size={34} color="#FFFFFF" />
        </View>
      </Pressable>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={fecharModal}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          {/* Fundo escuro */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={fecharModal}
            accessibilityLabel="Fechar menu"
          />

          {/* Painel */}
          <View
            style={[
              styles.modalContent,
              { paddingBottom: Math.max(insets.bottom, 20) },
            ]}
          >
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {showAddExpense ? "Nova despesa" : "Adicionar ao WiseWallet"}
              </Text>

              <Pressable onPress={fecharModal} hitSlop={12}>
                <Ionicons name="close" size={26} color="#0521C2" />
              </Pressable>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {showAddExpense ? (
                <AddExpense onExpenseSaved={fecharModal} />
              ) : (
                <SelectExpenseType onSelectExpense={abrirFormularioDespesa} />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Menu
const Tabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    animation: "fade",

    transitionSpec: {
      animation: "timing",
      config: {
        duration: 250,
      },
    },

    tabBarActiveTintColor: "#0521C2",
    tabBarInactiveTintColor: "#8A8A8A",

    tabBarStyle: {
      backgroundColor: "#FFFFFF",
      borderTopColor: "#EEEEEE",
      height: 65,
      paddingTop: 4,
      overflow: "visible",
    },

    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: "600",
    },
  },

  screens: {
    Inicio: {
      screen: InitialScreen,
      options: {
        title: "Início",
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            color={color}
            size={size}
          />
        ),
      },
    },

    Transacoes: {
      screen: TransactionsScreen,
      options: {
        title: "Transações",
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "list" : "list-outline"}
            color={color}
            size={size}
          />
        ),
      },
    },

    Adicionar: {
      screen: EmptyScreen,
      options: {
        title: "",
        tabBarLabel: () => null,
        tabBarButton: () => <AddTabButton />,
      },
    },

    Estatisticas: {
      screen: StatisticsScreen,
      options: {
        title: "Estatísticas",
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "stats-chart" : "stats-chart-outline"}
            color={color}
            size={size}
          />
        ),
      },
    },

    Mais: {
      screen: MoreScreen,
      options: {
        title: "Mais",
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={
              focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline"
            }
            color={color}
            size={size}
          />
        ),
      },
    },
  },
});

export default Tabs;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0521C2",
  },

  addTabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  addButton: {
    position: "absolute",
    top: -22,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0521C2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 12,
    maxHeight: "85%",
  },

  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D8DFE9",
    alignSelf: "center",
    marginBottom: 20,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0521C2",
  },
});

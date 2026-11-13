import { View, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RecentExpense } from "../../../components/recentExpense";
import { ExpenseCategoryChart } from "../../../components/ExpenseCategoryChart";
import { TextButton } from "../../../components/TextButton";
import { useAuth } from "../../../contexts/AuthContext";
import { globalStyles } from "../../../styles/globalStyles";

export function InitialScreen() {
  const { user } = useAuth();

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const mesesAno = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const hoje = new Date();
  const nomeDia = diasDaSemana[hoje.getDay()];
  const diaDoMes = hoje.getDate();
  const nomeMes = mesesAno[hoje.getMonth()];
  const ano = hoje.getFullYear();

  // dados user auth
  const nome =
    user?.user_metadata?.name ?? user?.user_metadata?.full_name ?? "Utilizador";

  const userImg =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

    const indiceMesAnterior = hoje.getMonth() === 0 ? 11 : hoje.getMonth() - 1;
const mesFace = mesesAno[indiceMesAnterior];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#FFFFFF" }]} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.headerRow}>
          <View style={styles.content}>
            <View style={styles.bolaEsquerda} />
            <View style={styles.bolaDireita} />
            <Text style={[styles.textBold, { marginBottom: -5 }]}>Olá,</Text>
            <Text
              style={[styles.textBold, { marginLeft: -5, color: "#2541df" }]}
            >
              {" "}
              {nome}!
            </Text>
            <Text style={globalStyles.secundaryText}>
              {nomeDia}, {diaDoMes} de {nomeMes} de {ano}
            </Text>
          </View>

          <Image source={userImg ? { uri: userImg } : require("../../../assets/default_user_logo.jpg")} style={styles.userImage} />
        </View>
        {/* gasto total mes */}
        <View style={styles.table}>
          <Text
            style={[
              globalStyles.secundaryText,
              { marginTop: 10, marginLeft: 13, fontSize: 17 },
            ]}
          >
            TOTAL GASTO ESTE MÊS
          </Text>
          <Text
            style={{
              color: "#0521C2",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 13,
              marginTop: 7,
            }}
          >
            0,00€
          </Text>
          <Text style={globalStyles.infoArredondada}>
            {" "}
            0% face a {mesFace}
          </Text>
        </View>

        {/* gasto categoria */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, }}>
          <Text style={[globalStyles.textBold, { fontSize: 23 }]}>Gastos por categoria</Text>
          <TextButton titulo="Ver mais" style={{ color: "blue" }} onPress={() => console.log("teste")} />
        </View>

        <View style={[styles.table, { marginTop: 10, paddingVertical: 20, paddingHorizontal: 10 }]}>
          <ExpenseCategoryChart />

        </View>


        {/* despesas recentes */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, }}>
          <Text style={[globalStyles.textBold, { fontSize: 23 }]}> Despesas Recentes</Text>
          <TextButton titulo="Ver todas" style={{ color: "blue" }} onPress={() => console.log("teste")} />
        </View>

        <View style={[styles.table, { marginTop: 10, paddingVertical: 20, paddingHorizontal: 10 }]}>
          <RecentExpense />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 26,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 20,
    borderColor: "#1b88df",
    borderWidth: 3,
  },
  bolaEsquerda: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E2EFFF",
    top: -20,
    left: -120,
  },

  bolaDireita: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E2EFFF",
    top: 90,
    right: -225,
  },
  table: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#E2EFFF",
    borderWidth: 1,
    borderRadius: 15,
  }
});

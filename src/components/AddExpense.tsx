import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Calendar, CalendarUtils } from "react-native-calendars";

import "../types/calendarLocale";
import { useNavigation } from "@react-navigation/native";

export function AddExpense() {
  const [valor, setValor] = useState("");

  // data
  const [dataSelecionada, setDataSelecionada] = useState(() =>
    CalendarUtils.getCalendarDateString(new Date()),
  );

  // controlar calendario
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      {/* VALOR */}
      <View style={styles.valorCard}>
        <Text style={styles.valorLabel}>VALOR DA DESPESA</Text>

        <View style={styles.valorRow}>
          <TextInput
            style={styles.valorInput}
            value={valor}
            onChangeText={setValor}
            placeholder="0,00"
            placeholderTextColor="#A5B5D3"
            keyboardType="decimal-pad"
            textAlign="center"
          />

          <Text style={styles.euro}>€</Text>
        </View>

        <Text style={styles.valorHint}>Quanto gastaste?</Text>
      </View>

      {/* cats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categoria</Text>

        <View style={styles.categoriasContainer}>
          {/* Alimentação */}
          <View style={styles.categoria}>
            <View
              style={[styles.categoriaIcon, { backgroundColor: "#FFF1DC" }]}
            >
              <Ionicons name="restaurant-outline" size={24} color="#F59E0B" />
            </View>

            <Text style={styles.categoriaText}>Alimentação</Text>
          </View>

          {/* Transportes */}
          <View style={styles.categoria}>
            <View
              style={[styles.categoriaIcon, { backgroundColor: "#E4EEFF" }]}
            >
              <Ionicons name="car-outline" size={24} color="#3878E8" />
            </View>

            <Text style={styles.categoriaText}>Transportes</Text>
          </View>

          {/* Habitação */}
          <View style={styles.categoria}>
            <View
              style={[styles.categoriaIcon, { backgroundColor: "#E0F8EF" }]}
            >
              <Ionicons name="home-outline" size={24} color="#16A879" />
            </View>

            <Text style={styles.categoriaText}>Habitação</Text>
          </View>

          {/* compras */}
          <View style={styles.categoria}>
            <View
              style={[styles.categoriaIcon, { backgroundColor: "#F0E7FF" }]}
            >
              <Ionicons name="bag-outline" size={24} color="#9561D8" />
            </View>

            <Text style={styles.categoriaText}>Compras</Text>
          </View>
        </View>
      </View>

      {/* desc */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="create-outline" size={20} color="#8391AB" />

          <TextInput
            style={styles.textInput}
            placeholder="Ex.: Almoço no restaurante"
            placeholderTextColor="#9AA6BA"
          />
        </View>
      </View>

      {/* data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>

        {/* abrir fechar calendario */}
        <Pressable
          style={styles.inputContainer}
          onPress={() => setCalendarioAberto(!calendarioAberto)}
        >
          <Ionicons name="calendar-outline" size={21} color="#0521C2" />

          <Text style={styles.dataText}>
            {dataSelecionada.split("-").reverse().join("/")}
          </Text>

          <Ionicons
            name={calendarioAberto ? "chevron-up" : "chevron-down"}
            size={18}
            color="#8391AB"
          />
        </Pressable>

        {/* so aparece se calendarioaberto = true */}
        {calendarioAberto && (
          <View style={styles.calendarContainer}>
            <Calendar
              current={dataSelecionada}
              firstDay={1}
              // user seleciona data
              onDayPress={(day) => {
                setDataSelecionada(day.dateString);
                setCalendarioAberto(false);
              }}
              // data selecionada
              markedDates={{
                [dataSelecionada]: {
                  selected: true,
                  selectedColor: "#0521C2",
                  selectedTextColor: "#FFFFFF",
                },
              }}
              // cores
              theme={{
                calendarBackground: "#FFFFFF",
                monthTextColor: "#0521C2",
                todayTextColor: "#1B88DF",
                arrowColor: "#0521C2",
                dayTextColor: "#1F2C47",
                textSectionTitleColor: "#8391AB",
                textDisabledColor: "#B8C3D6",
                selectedDayBackgroundColor: "#0521C2",
                selectedDayTextColor: "#FFFFFF",
                textMonthFontWeight: "bold",
              }}
            />
          </View>
        )}
      </View>

      {/* obs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Observações
          <Text style={styles.optionalText}> (opcional)</Text>
        </Text>

        <TextInput
          style={styles.notesInput}
          placeholder="Adicionar uma nota..."
          placeholderTextColor="#9AA6BA"
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* btn guardar */}
      <View style={styles.saveButton}>
        <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />

        <Text style={styles.saveButtonText}>Guardar despesa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    gap: 22,
  },

  // vlr
  valorCard: {
    backgroundColor: "#F0F5FF",
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E9FF",
  },

  valorLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#6983B0",
  },

  valorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  valorInput: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#0521C2",
    minWidth: 120,
    maxWidth: "80%",
    paddingVertical: 4,
  },

  euro: {
    fontSize: 30,
    fontWeight: "600",
    color: "#0521C2",
    marginLeft: 6,
  },

  valorHint: {
    fontSize: 12,
    color: "#8A9BB9",
    marginTop: 4,
  },

  // seccao
  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2C47",
  },

  // cat
  categoriasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },

  categoria: {
    flex: 1,
    alignItems: "center",
    gap: 7,
  },

  categoriaIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  categoriaText: {
    fontSize: 10,
    color: "#566580",
    textAlign: "center",
    fontWeight: "500",
  },

  // inputs
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F8FAFE",
    borderWidth: 1,
    borderColor: "#E5EAF3",
    borderRadius: 14,
    paddingHorizontal: 15,
    minHeight: 54,
  },

  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2C47",
  },

  placeholderText: {
    flex: 1,
    fontSize: 14,
    color: "#9AA6BA",
  },

  optionalText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9AA6BA",
  },

  notesInput: {
    backgroundColor: "#F8FAFE",
    borderWidth: 1,
    borderColor: "#E5EAF3",
    borderRadius: 14,
    padding: 15,
    fontSize: 14,
    minHeight: 90,
    color: "#1F2C47",
  },

  // datea
  dataText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#0521C2",
  },

  calendarContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5EAF3",
    padding: 8,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    elevation: 3,
  },

  // btn guardar
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#0521C2",
    borderRadius: 16,
    paddingVertical: 17,
    marginTop: 4,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

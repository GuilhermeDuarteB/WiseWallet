
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Calendar, CalendarUtils } from "react-native-calendars";

import "../types/calendarLocale";
import { categories } from "../constants/categories";

export function AddExpense() {
  // Estados do formulário
  const [valor, setValor] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [mostrarTodasCategorias, setMostrarTodasCategorias] = useState(false);

  // Data da despesa e visibilidade do calendário
  const [dataSelecionada, setDataSelecionada] = useState(() =>
    CalendarUtils.getCalendarDateString(new Date())
  );
  const [calendarioAberto, setCalendarioAberto] = useState(false);

  // Mostra quatro categorias ou todas, conforme o estado.
  const categoriasVisiveis = mostrarTodasCategorias
    ? categories
    : categories.slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Valor */}
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

      {/* Categorias */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categoria</Text>

        <View style={styles.categoriasContainer}>
          {categoriasVisiveis.map((categoria) => {
            const selecionada = categoriaSelecionada === categoria.id;

            return (
              <TouchableOpacity
                key={categoria.id}
                style={styles.categoria}
                onPress={() => setCategoriaSelecionada(categoria.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.categoriaIcon,
                    { backgroundColor: `${categoria.color}20` },
                    selecionada && styles.categoriaSelecionada,
                  ]}
                >
                  <Ionicons
                    name={categoria.icon as keyof typeof Ionicons.glyphMap}
                    size={24}
                    color={categoria.color}
                  />
                </View>

                <Text
                  style={[
                    styles.categoriaText,
                    selecionada && styles.categoriaTextSelecionada,
                  ]}
                >
                  {categoria.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Expandir ou esconder as restantes categorias */}
        <TouchableOpacity
          style={styles.verCategoriasButton}
          onPress={() => setMostrarTodasCategorias(!mostrarTodasCategorias)}
          activeOpacity={0.7}
        >
          <Text style={styles.verCategoriasText}>
            {mostrarTodasCategorias ? "Mostrar menos" : "Ver todas as categorias"}
          </Text>

          <Ionicons
            name={mostrarTodasCategorias ? "chevron-up" : "chevron-down"}
            size={18}
            color="#0521C2"
          />
        </TouchableOpacity>
      </View>

      {/* Descrição */}
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

      {/* Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>

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

        {/* O calendário só aparece quando é aberto. */}
        {calendarioAberto && (
          <View style={styles.calendarContainer}>
            <Calendar
              current={dataSelecionada}
              firstDay={1}
              onDayPress={(day) => {
                setDataSelecionada(day.dateString);
                setCalendarioAberto(false);
              }}
              markedDates={{
                [dataSelecionada]: {
                  selected: true,
                  selectedColor: "#0521C2",
                  selectedTextColor: "#FFFFFF",
                },
              }}
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

      {/* Observações */}
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

      {/* Botão de guardar */}
      <View style={styles.saveButton}>
        <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>Guardar despesa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estrutura geral
  container: {
    paddingBottom: 20,
    gap: 22,
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2C47",
  },

  // Valor
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

  // Categorias
  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 12,
  },

  categoria: {
    width: "22%",
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

  categoriaSelecionada: {
    borderWidth: 2,
    borderColor: "#0521C2",
  },

  categoriaText: {
    fontSize: 10,
    color: "#566580",
    textAlign: "center",
    fontWeight: "500",
  },

  categoriaTextSelecionada: {
    color: "#0521C2",
    fontWeight: "700",
  },

  verCategoriasButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
  },

  verCategoriasText: {
    color: "#0521C2",
    fontSize: 13,
    fontWeight: "600",
  },

  // Campos de texto
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

  // Calendário
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

  // Botão de guardar
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

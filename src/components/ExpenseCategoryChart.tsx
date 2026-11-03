import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export function ExpenseCategoryChart() {
  const data = [
    { value: 10, color: "red", focused: true },
    { value: 10, color: "pink" },
    { value: 10, color: "blue", text: "Categoria" },
    { value: 70, color: "green" },
  ];
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PieChart
        radius={95}
        donut
        showText
        textColor="black"
        data={data}
        centerLabelComponent={() => {
          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
              >
                Total
              </Text>
              <Text style={{ fontSize: 14, color: "gray" }}>0,00</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

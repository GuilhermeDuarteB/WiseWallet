import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { Navigation } from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";
import { WiseBotButton } from "./components/WiseBotButton";
import { ExpenseProvider } from "./contexts/ExpenseContext";

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ExpenseProvider>
      <Navigation theme={theme} />
      <WiseBotButton />
        </ExpenseProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

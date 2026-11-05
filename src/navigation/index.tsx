import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./screens/(auth)/Login";
import { InitialScreen } from "./screens/(panel)/InitialScreen";
import { Register } from "./screens/(auth)/Register";
import { LoginEmail } from "./screens/(auth)/LoginEmail";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import loading from "./screens/loading";
import AppTabs from "./appTabs";
import { InitialScreen as AuthInitialScreen } from "./screens/(auth)/InitialScreen";
import { AddExpense } from "../components/AddExpense";
//verifica se session ainda esta a dar loading
function userIsLoading() {
  const { loading } = useAuth();
  return loading;
}

//  verifica user esta auth
function userSignIn() {
  const { loading, user } = useAuth();
  return !loading && user !== null;
}

// verifica user nao esta auth
function userIsSignedOut() {
  const { loading, user } = useAuth();
  return !loading && user === null;
}

//definir rotas
const RootStack = createNativeStackNavigator({
  screenOptions: {
    animation: "fade",
    animationDuration: 300,
    headerShown: false,
  },
  screens: {
    Loading: {
      if: userIsLoading,
      screen: loading,
      options: {
        headerShown: false,
      },
    },
    AuthInitialScreen: {
      if: userIsSignedOut,
      screen: AuthInitialScreen,
      options: {
        headerShown: false,
      },
      AddExpense:{
        screen: AddExpense,
        options: {
          headerShown: false,}
      },
    },
    Login: {
      if: userIsSignedOut,
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    AppTabs: {
      if: userSignIn,
      screen: AppTabs,
      options: {
        headerShown: false,
      },
    },
    Register: {
      if: userIsSignedOut,
      screen: Register,
      options: {
        headerShown: false,
      },
    },
    LoginEmail: {
      if: userIsSignedOut,
      screen: LoginEmail,
      options: {
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

type RootStackType = typeof RootStack;

declare module "@react-navigation/native" {
  interface RootNavigator extends RootStackType {}
}

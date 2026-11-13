import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../styles/globalStyles";
import { RowOptions } from "../../../components/RowOptions";
import { useAuth } from "../../../contexts/AuthContext";
import { IconAppButton } from "../../../components/IconAppButton";
import { supabase } from "../../../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export function MoreScreen() {
  // Terminar sessão
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Erro", "Erro ao tentar sair da conta.");
      console.log("erro logou:", error.message);
      return;
    }

    console.log("sessao terminada");
  }

  const { user } = useAuth();

  const nome =
    user?.user_metadata?.name ?? user?.user_metadata?.full_name ?? "Utilizador";

  const userImg =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

  const userEmail =
    user?.user_metadata?.email ?? user?.user_metadata.user_email ?? "Email";
  return (
    <SafeAreaView style={globalStyles.containerInitial}>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={globalStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.headerRow}>
          <View style={globalStyles.content}>
            <Text style={[globalStyles.textBold, globalStyles.rowText]}>
              Mais
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => console.log("btn mais teste")}
          style={[styles.accountButton, {marginTop: 25}]}
          activeOpacity={0.7}
        >
          <Image
            source={
              userImg
                ? { uri: userImg }
                : require("../../../assets/default_user_logo.jpg")
            }
            style={styles.userImage}
          />

          <View style={styles.accountInfo}>
            <Text style={styles.accountTitle}>A minha conta</Text>
            <Text style={styles.accountEmail}>{userEmail}</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#0521C2" />
        </TouchableOpacity>

        <View>
            <Text style={[globalStyles.subtitle, {marginTop: 25, color: "#676363"}]}>
                Finanças
            </Text>

          <RowOptions
            titulo="Dívidas"
            description="A Pagar e a Receber"
            icon="cash-outline"
            iconColor="#118C4F"
            iconSize={50}
            icon2="arrow-forward-outline"
          />

          <RowOptions
            titulo="Categorias"
            description="Personaliza as tuas Categorias"
            icon="apps-outline"
            iconColor="#FFCC00"
            iconSize={50}
            icon2="arrow-forward-outline"
          />

          <Text style={[globalStyles.subtitle, {marginTop: 25, color: "#676363"}]}>
                Definições
            </Text>

            <RowOptions
            titulo="Preferências"
            description="Moeda e outras preferências"
            icon="cog-outline"
            iconColor="black"
            iconSize={50}
            icon2="arrow-forward-outline"
          />
        </View>

        <IconAppButton
          titulo="Terminar Sessão"
          simbolo="log-out-outline"
          onPress={handleSignOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  accountButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FF",
    padding: 20,
    borderRadius: 24,
    gap: 16,
  },
  userImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E2EFFF",
    borderColor: "#1b88df",
    borderWidth: 3,
  },

  accountInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },

  accountTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#172440",
  },

  accountEmail: {
    fontSize: 16,
    color: "#7889AA",
  },
});

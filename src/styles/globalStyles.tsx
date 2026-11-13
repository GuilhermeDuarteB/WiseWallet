import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  blueTitle:{

  },
  slogan: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginTop: -5,
  },
  subtitle: {
    fontSize: 16,
    color: "#dad4d4",
    marginBottom: 5,
  },
  btnNoIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: "55%",
  },
  logoScreens: {
    width: 170,
    height: 163,
    resizeMode: "contain",
  },
  logoTextScreens: {
    width: 250,
    height: 55,
    marginTop: 8,
    marginBottom: 5,
    resizeMode: "contain",
  },
  secundaryText: {
    color: "#74819b",
    marginBottom: 5,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  containerInitial: {
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
  rowText: {
    color: "#2541df",
  },
  infoArredondada: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 9,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#E2EFFF",
    fontSize: 15,
    color: "#0521C2",
    borderRadius: 20,
    overflow: "hidden",
    fontWeight: "500",
  },
});

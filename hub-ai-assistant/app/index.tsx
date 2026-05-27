import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import { getStoredUser } from "../lib/storage";

export default function IndexScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const user = await getStoredUser();
      await new Promise((r) => setTimeout(r, 2000));
      setIsReady(true);
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    };
    bootstrap();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>H</Text>
      </View>
      <Text style={styles.title}>HUB AI Assistant</Text>
      <Text style={styles.subtitle}>Empresa corporativa</Text>
      <ActivityIndicator size="large" color="#3B82F6" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  logoText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 48,
  },
  spinner: {
    marginTop: 0,
  },
});

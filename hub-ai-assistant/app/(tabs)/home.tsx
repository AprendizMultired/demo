import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import { getStoredUser, clearSession } from "../../lib/storage";
import { UserData } from "../../types/user";

declare const confirm: (msg: string) => boolean;

export default function HomeScreen() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    getStoredUser().then(setUser);
  }, []);

  const doLogout = async () => {
    await clearSession();
    router.replace("/(auth)/login");
  };

  const handleLogout = () => {
    if (Platform.OS === "web") {
      if (confirm("¿Estás seguro de cerrar sesión?")) {
        doLogout();
      }
    } else {
      Alert.alert("Cerrar sesión", "¿Estás seguro de cerrar sesión?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: doLogout,
        },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerGreeting}>Bienvenido,</Text>
        <Text style={styles.headerName}>
          {user?.fullName ?? "Usuario"}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Text style={styles.cardIconText}>H</Text>
          </View>
          <Text style={styles.cardTitle}>HUB AI Assistant</Text>
          <Text style={styles.cardBody}>
            Base inicial de{" "}
            <Text style={styles.cardBodyBold}>HUB AI Assistant</Text>
            . Próximamente: chatbot empresarial inteligente conectado a un HUB
            centralizado.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Información de la cuenta</Text>
          {user && (
            <View>
              <InfoRow label="Documento" value={user.document} />
              <InfoRow label="Correo" value={user.email} />
              <InfoRow label="Teléfono" value={user.phone} />
            </View>
          )}
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  header: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#93C5FD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerGreeting: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
  headerName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#CBD5E1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  cardIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardIconText: {
    color: "#2563EB",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  cardBody: {
    color: "#64748B",
    lineHeight: 20,
  },
  cardBodyBold: {
    fontWeight: "600",
    color: "#334155",
  },
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoLabel: {
    color: "#64748B",
    fontSize: 14,
  },
  infoValue: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 16,
  },
});

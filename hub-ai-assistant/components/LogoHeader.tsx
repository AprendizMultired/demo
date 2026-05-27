import { View, Text, StyleSheet } from "react-native";

interface LogoHeaderProps {
  subtitle?: string;
}

export default function LogoHeader({ subtitle }: LogoHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>H</Text>
      </View>
      <Text style={styles.title}>HUB AI Assistant</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 64,
    height: 64,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#93C5FD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  logoText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
  },
});

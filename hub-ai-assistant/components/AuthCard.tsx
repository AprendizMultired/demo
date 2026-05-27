import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginHorizontal: 4,
    shadowColor: "#CBD5E1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

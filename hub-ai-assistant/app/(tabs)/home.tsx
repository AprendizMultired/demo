import { useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, FlatList,
  Alert, Platform, StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { getStoredUser, clearSession } from "../../lib/storage";
import { UserData } from "../../types/user";

declare const confirm: (msg: string) => boolean;

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const CHATS: ChatItem[] = [
  {
    id: "hub-ai",
    name: "HUB AI Assistant",
    avatar: "H",
    lastMessage: "¡Hola! Soy el asistente virtual de HUB AI...",
    time: "Ahora",
    unread: 1,
  },
  {
    id: "sistema",
    name: "Notificaciones",
    avatar: "N",
    lastMessage: "Bienvenido a HUB AI Assistant",
    time: "Ayer",
    unread: 0,
  },
];

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
      if (confirm("¿Estás seguro de cerrar sesión?")) doLogout();
    } else {
      Alert.alert("Cerrar sesión", "¿Estás seguro de cerrar sesión?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesión", style: "destructive", onPress: doLogout },
      ]);
    }
  };

  const renderChat = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.6}
      onPress={() => router.push(`/(tabs)/chat?id=${item.id}&name=${encodeURIComponent(item.name)}`)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatTop}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatBottom}>
          <Text style={styles.chatLastMsg} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HUB AI</Text>
        <View style={styles.headerRight}>
          <Text style={styles.userName}>{user?.fullName ?? "Usuario"}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userName: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
  },
  logoutText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "500",
  },
  list: {
    paddingTop: 4,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
  },
  chatTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  chatTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
  chatBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatLastMsg: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginLeft: 82,
  },
});

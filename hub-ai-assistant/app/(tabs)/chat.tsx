import { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getStoredUser } from "../../lib/storage";
import { UserData } from "../../types/user";

interface Message {
  id: string;
  text: string;
  from: "bot" | "user";
}

const WELCOME_MSG =
  "¡Hola! Soy el asistente virtual de HUB AI. Estoy aquí para ayudarte. Actualmente me encuentro en desarrollo, pero pronto estaré completamente operativo. ¿En qué puedo ayudarte?";

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const chatName = name ? decodeURIComponent(name) : "Chat";
  const [user, setUser] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", text: WELCOME_MSG, from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    getStoredUser().then(setUser);
  }, []);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now().toString(), text, from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Gracias por tu mensaje. El chatbot estará disponible próximamente.",
        from: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isBot = item.from === "bot";
    return (
      <View style={[styles.bubbleRow, isBot ? styles.botRow : styles.userRow]}>
        {isBot && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
        )}
        <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
          <Text style={[styles.bubbleText, isBot ? styles.botText : styles.userText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>
            {chatName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{chatName}</Text>
          <Text style={styles.headerStatus}>en línea</Text>
        </View>
        {user && (
          <Text style={styles.headerUser}>{user.fullName}</Text>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatArea}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#94A3B8"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EDE7DE",
  },
  header: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  backText: {
    color: "white",
    fontSize: 22,
  },
  avatarSmall: {
    width: 38,
    height: 38,
    backgroundColor: "#1D4ED8",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarSmallText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerStatus: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 1,
  },
  headerUser: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginLeft: 8,
  },
  chatArea: {
    padding: 12,
    paddingBottom: 8,
  },
  bubbleRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-end",
  },
  botRow: {
    justifyContent: "flex-start",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: "#2563EB",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  avatarText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  botBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: "#DCF8C6",
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: "#1E293B",
  },
  userText: {
    color: "#1E293B",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#F1F5F9",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#1E293B",
  },
  sendBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 8,
  },
  sendBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

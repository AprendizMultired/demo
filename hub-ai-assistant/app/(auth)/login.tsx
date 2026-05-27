import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import LogoHeader from "../../components/LogoHeader";
import AuthCard from "../../components/AuthCard";
import { loginSchema, LoginSchemaType } from "../../lib/validation";
import { validateCredentials } from "../../lib/storage";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { document: "", password: "" },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setLoading(true);
    setError("");
    try {
      const user = await validateCredentials(data.document, data.password);
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        setError("Credenciales inválidas");
      }
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <LogoHeader subtitle="Inicia sesión en tu cuenta" />

          <AuthCard>
            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Controller
              control={control}
              name="document"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Número de documento"
                  placeholder="CC"
                  keyboardType="number-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.document?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Contraseña"
                  placeholder="••••••••"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <PrimaryButton
              title="Iniciar sesión"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </AuthCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.footerLink}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  errorBanner: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: "#64748B",
    fontSize: 14,
  },
  footerLink: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },
});

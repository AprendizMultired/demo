import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import LogoHeader from "../../components/LogoHeader";
import AuthCard from "../../components/AuthCard";
import { registerSchema, RegisterSchemaType } from "../../lib/validation";
import { saveUser } from "../../lib/storage";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      document: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true);
    try {
      await saveUser({
        fullName: data.fullName,
        document: data.document,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      Alert.alert(
        "Registro exitoso",
        "Tu cuenta ha sido creada correctamente",
        [
          {
            text: "Iniciar sesión",
            onPress: () => router.replace("/(auth)/login"),
          },
        ]
      );
    } catch {
      Alert.alert("Error", "No se pudo completar el registro");
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
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <LogoHeader subtitle="Crea tu cuenta corporativa" />

          <AuthCard>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Nombre completo"
                  placeholder="Ej: Josse Fredy Reyes"
                  autoCapitalize="words"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="document"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Número de documento (CC)"
                  placeholder="123456789"
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
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Teléfono"
                  placeholder="3001234567"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Correo electrónico"
                  placeholder="correo@empresa.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Contraseña"
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Confirmar contraseña"
                  placeholder="Repite la contraseña"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            <PrimaryButton
              title="Crear cuenta"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </AuthCard>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text style={styles.footerLink}>Iniciar sesión</Text>
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

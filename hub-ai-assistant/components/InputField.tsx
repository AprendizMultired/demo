import { View, Text, TextInput, TextInputProps, StyleSheet } from "react-native";
import { COLORS } from "../lib/constants";

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function InputField({
  label,
  error,
  style,
  ...props
}: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={COLORS.textMuted}
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1E293B",
  },
  inputError: {
    borderColor: "#F87171",
  },
  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

import { z } from "zod";

export const loginSchema = z.object({
  document: z.string().min(1, "El número de documento es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    document: z
      .string()
      .regex(/^\d+$/, "Solo se permiten números"),
    phone: z
      .string()
      .regex(/^\d+$/, "Solo se permiten números"),
    email: z.string().email("Correo electrónico inválido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Debe confirmar la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;

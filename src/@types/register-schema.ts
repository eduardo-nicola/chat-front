import { z } from "zod";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),

  document: z.string().refine((val) => cpf.isValid(val) || cnpj.isValid(val), {
    message: "Por favor, insira um CPF ou CNPJ válido",
  }),
  phone: z
    .string()
    .min(10, { message: "O telefone deve ter pelo menos 10 dígitos" })
    .max(11, { message: "O telefone não pode ter mais que 11 dígitos" })
    .refine((val) => /^(\d{10}|\d{11})$/.test(val), {
      message: "Número de telefone inválido",
    }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

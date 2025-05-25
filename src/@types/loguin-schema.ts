import { cnpj, cpf } from "cpf-cnpj-validator";
import { z } from "zod";

export const loginSchema = z.object({
  document: z.string().refine((val) => cpf.isValid(val) || cnpj.isValid(val), {
    message: "Por favor, insira um CPF ou CNPJ válido",
  }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

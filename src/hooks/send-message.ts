import api from "@/services/api";
import { z } from "zod";
import { toast } from "./use-toast";

export const sendMessageSchema = z.object({
  phone: z
    .string()
    .min(10, "Digite o número com DDD")
    .regex(
      /^(\d{2})(\d{7,8})$/,
      "Formato inválido. Use DDD + número (ex: 44988887777)"
    ),
  message: z.string().min(1, "A mensagem não pode estar vazia"),
});

export type SendMessageFormData = z.infer<typeof sendMessageSchema>;

export async function onSendMessage(
  data: SendMessageFormData,
  callback?: () => void
) {
  try {
    let phone = data.phone.trim();
    phone = phone.replace(/\D/g, "");

    if (!phone.startsWith("55")) {
      phone = `55${phone}`;
    }

    await api.post("/whatsapp/send", {
      from: phone,
      message: data.message,
    });

    toast({
      title: "Mensagem enviada com sucesso!",
      variant: "success",
    });

    if (callback) {
      callback();
    }
  } catch (err) {
    toast({
      title: "Erro ao enviar mensagem",
      variant: "error",
    });
  }
}

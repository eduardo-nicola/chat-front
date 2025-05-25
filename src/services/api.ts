"use-client";

import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { getCookie } from "typescript-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SVC_BACK,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("chat_app_tk");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const defaultMessage = "Ocorreu um erro inesperado.";
    console.log(error);
    if (error.response) {
      const { data } = error.response;

      let message: string;

      if (typeof data.message === "string") {
        message = data.message;
      } else if (Array.isArray(data.message)) {
        message = data.message[0];
      } else {
        message = defaultMessage;
      }

      toast({
        title: "Erro",
        description: message,
        variant: "error",
      });
    } else {
      toast({
        title: "Erro",
        description: defaultMessage,
        variant: "error",
      });
    }

    return Promise.reject(error);
  }
);

export default api;

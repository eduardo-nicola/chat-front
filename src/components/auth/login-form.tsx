"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, DockIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginFormValues, loginSchema } from "@/@types/loguin-schema";
import { formatDocument } from "@/hooks/use-document";
import api from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { setCookie } from "typescript-cookie";

interface LoginFormProps {
  onRegisterClick: () => void;
}

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      document: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const { data } = await api.post("auth/login", values);
      data as { accessToken: string };
      if (data.accessToken) {
        setCookie("chat_app_tk", data.accessToken, { expires: 7 });
        toast({
          title: "Login",
          description: "Login realizado com sucesso",
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="document"
          render={({ field: { onChange, value, ...rest } }) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value.replace(/\D/g, "");
              onChange(rawValue); // Atualiza com valor limpo
            };

            return (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...rest}
                      onChange={handleChange}
                      value={formatDocument(value || "")}
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant={"ghost"}
                    className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Ocultar senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando" : "Entrar"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Button
              variant="link"
              className="p-0 text-primary"
              onClick={onRegisterClick}
              type="button"
            >
              Criar
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, DockIcon, Lock, User, Phone } from "lucide-react";
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
import { RegisterFormValues, registerSchema } from "@/@types/register-schema";
import { cnpj, cpf } from "cpf-cnpj-validator";
import api from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { formatDocument } from "@/hooks/use-document";

interface RegisterFormProps {
  onLoginClick: () => void;
}

const formatPhone = (value: string) => {
  const v = value.replace(/\D/g, "").slice(0, 11);
  if (v.length <= 10) {
    return v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    return v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
};

export function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      document: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true);

    try {
      const response = await api.post("/clients", values);
      if (response) {
        toast({
          title: "Sucesso",
          description: "Cadastro realizado com sucesso!",
          variant: "success",
        });
        onLoginClick();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Seu Nome" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="phone"
          render={({ field: { onChange, value, ...rest } }) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value.replace(/\D/g, "").slice(0, 11);
              onChange(rawValue);
            };

            return (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      {...rest}
                      onChange={handleChange}
                      value={formatPhone(value || "")}
                      placeholder="(11) 91234-5678"
                      className="pl-10"
                      type="tel"
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
                    variant="ghost"
                    size="icon"
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
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Button
              variant="link"
              className="p-0 text-primary"
              onClick={onLoginClick}
              type="button"
            >
              Entrar
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}

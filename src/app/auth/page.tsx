"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/auth/animated-background";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-md px-4 py-8 z-10">
        <AuthCard>
          <div className="w-full space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                {isLogin ? "Bem-vindo de volta" : "Crie uma conta"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isLogin ? ("Insira suas credenciais para acessar sua conta") :
                ("Preencha seus dados para começar")}
              </p>
            </div>
            
            {isLogin ? (
              <LoginForm onRegisterClick={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onLoginClick={() => setIsLogin(true)} />
            )}
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { removeCookie } from "typescript-cookie";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    removeCookie("chat_app_tk");
    toast({
      title: "Desconectado",
      description: "Você saiu da sua conta com sucesso.",
      variant: "default",
    });
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };

  return (
    <>
      <Button variant="default" size="icon" onClick={() => setOpen(true)}>
        <LogOut className="h-5 w-5" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-neutral-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza de que deseja sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Sair irá desconectar este dispositivo da sua conta do WhatsApp.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

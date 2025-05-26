"use client";

import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { RenderQrCode } from "./render-qrcode";

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      getQrCode();
    }
  }, [open]);

  const handleConnect = () => {
    setOpen(false);
    toast({
      title: "Conectado com Sucesso",
      description: "Seu dispositivo foi conectado ao cliente web.",
      variant: "success",
    });
  };

  const getQrCode = async () => {
    const { data } = await api.get("/whatsapp/qr");
    data as { message: string; qr: string };
    if (data.qr) {
      setQrcode(data.qr);
    }
  };

  return (
    <>
      <Button variant="default" size="icon" onClick={() => setOpen(true)}>
        <QrCode className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-neutral-900">
          <DialogHeader>
            <DialogTitle>Conectar ao WhatsApp</DialogTitle>
            <DialogDescription>
              Escaneie o código QR com seu celular para conectar ao WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <RenderQrCode base64={qrcode} />
            <p className="text-sm text-gray-500 text-center">
              Mantenha seu celular próximo ao computador e certifique-se de que
              ele está conectado à internet.
            </p>
            <Button onClick={handleConnect} className="w-full">
              Já escaneei o código
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

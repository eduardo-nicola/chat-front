"use client";

import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function ConnectButton() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    setOpen(false);
    toast({
      title: "Connected Successfully",
      description: "Your device has been connected to the web client.",
      variant: "success",
    });
  };

  return (
    <>
      <Button variant="default" size="icon" onClick={() => setOpen(true)}>
        <QrCode className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect to WhatsApp</DialogTitle>
            <DialogDescription>
              Scan the QR code with your phone to connect WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-64 h-64 bg-white p-4 rounded-lg flex items-center justify-center">
              <div className="relative w-full h-full border-8 border-blue-600 rounded-lg overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="bg-black"></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white flex items-center justify-center rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Keep your phone near the computer and make sure it&apos;s
              connected to the internet.
            </p>
            <Button onClick={handleConnect} className="w-full">
              I&apos;ve Scanned the Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

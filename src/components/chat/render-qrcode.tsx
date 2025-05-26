import { Skeleton } from "@/components/ui/skeleton";

interface PropsRenderQrCode {
  base64: string;
}

export function RenderQrCode({ base64 }: PropsRenderQrCode) {
  return base64 ? (
    <img
      style={{
        filter: "brightness(1.3) contrast(2)",
        imageRendering: "pixelated",
      }}
      src={base64}
      alt="QR Code"
    />
  ) : (
    <Skeleton className="w-40 h-40 rounded-md" />
  );
}

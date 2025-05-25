interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className="w-full rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-6 sm:p-8 transition-all ease-in-out
        animate-in fade-in-50 slide-in-from-bottom-10 duration-500"
    >
      {children}
    </div>
  );
}

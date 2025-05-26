export function ChatSkeleton() {
  return (
    <div className="flex items-center p-3 space-x-3 animate-pulse">
      <div className="w-10 h-10 bg-gray-700 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-700 rounded" />
        <div className="h-3 w-1/2 bg-gray-600 rounded" />
      </div>
    </div>
  );
}

type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/60 bg-white/70 p-10 shadow-2xl shadow-black/5 backdrop-blur-3xl">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 opacity-40" />
          <span className="h-12 w-12 animate-spin rounded-full border-[3px] border-gray-200 border-t-transparent" />
        </div>
        <p className="text-base font-medium text-gray-600 tracking-wide">{message}</p>
      </div>
    </div>
  );
}

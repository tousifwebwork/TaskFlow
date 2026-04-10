export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
      <div className="flex items-center gap-2">
        <span>⚠️</span>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-medium underline underline-offset-2 hover:text-red-300 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}

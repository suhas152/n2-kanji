export default function ProgressBar({ value, max, className = '' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={`w-full rounded-full h-2 ${className}`} style={{ backgroundColor: '#2a2a3a' }}>
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: '#a855f7' }}
      />
    </div>
  );
}

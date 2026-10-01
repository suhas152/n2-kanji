export default function KanjiCard({ kanji, index, total, onPrev, onNext }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: '#16161d', borderColor: '#2a2a3a' }}>
      {/* Counter */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ backgroundColor: '#0f0f13', borderColor: '#2a2a3a' }}>
        <span className="text-sm font-medium" style={{ color: '#6b6b80' }}>Kanji #{kanji.number}</span>
        <span className="text-sm" style={{ color: '#4a4a5a' }}>{index + 1} / {total}</span>
      </div>

      {/* Kanji display */}
      <div className="flex flex-col items-center py-10 px-6">
        <div className="font-bold leading-none select-none mb-3" style={{ fontSize: '6rem', color: '#f0eeff' }}>
          {kanji.character}
        </div>
        <div className="text-sm" style={{ color: '#4a4a5a' }}>{kanji.stroke_count} strokes</div>
      </div>

      {/* Readings */}
      <div className="px-6 pb-5 space-y-3 border-t pt-5" style={{ borderColor: '#2a2a3a' }}>
        {kanji.on_readings.length > 0 && (
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-wider w-16 pt-0.5" style={{ color: '#a855f7' }}>ON</span>
            <div className="flex flex-wrap gap-2">
              {kanji.on_readings.map((r, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#2d1f47', color: '#c084fc' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
        {kanji.kun_readings.length > 0 && (
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-wider w-16 pt-0.5" style={{ color: '#34d399' }}>KUN</span>
            <div className="flex flex-wrap gap-2">
              {kanji.kun_readings.map((r, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#064e3b', color: '#6ee7b7' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Vocabulary */}
      <div className="border-t px-6 py-5" style={{ borderColor: '#2a2a3a' }}>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#4a4a5a' }}>
          Vocabulary ({kanji.words.length})
        </h3>
        <div className="space-y-3">
          {kanji.words.map((w, i) => (
            <div key={i} className="rounded-xl px-4 py-3" style={{ backgroundColor: '#0f0f13', border: '1px solid #2a2a3a' }}>
              <div className="text-xl font-bold" style={{ color: '#f0eeff' }}>{w.word}</div>
              <div className="text-sm mt-0.5" style={{ color: '#a855f7' }}>{w.furigana}</div>
              <div className="text-sm mt-0.5" style={{ color: '#9b9bb0' }}>{w.meaning}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#2a2a3a', backgroundColor: '#0f0f13' }}>
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: '#9b9bb0', backgroundColor: 'transparent' }}
          onMouseEnter={e => { if (index !== 0) e.currentTarget.style.backgroundColor = '#1e1e2a'; }}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: '#9b9bb0', backgroundColor: 'transparent' }}
          onMouseEnter={e => { if (index !== total - 1) e.currentTarget.style.backgroundColor = '#1e1e2a'; }}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

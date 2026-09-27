export default function KanjiCard({ kanji, index, total, onPrev, onNext }) {
  const wordCount = kanji.words.length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Counter */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100 bg-stone-50">
        <span className="text-sm text-stone-500 font-medium">
          Kanji #{kanji.number}
        </span>
        <span className="text-sm text-stone-400">
          {index + 1} / {total}
        </span>
      </div>

      {/* Main kanji display */}
      <div className="flex flex-col items-center py-10 px-6">
        <div className="text-8xl font-bold text-stone-900 leading-none select-none mb-3">
          {kanji.character}
        </div>
        <div className="text-stone-400 text-sm">{kanji.stroke_count} strokes</div>
      </div>

      {/* Readings */}
      <div className="px-6 pb-5 space-y-3 border-t border-stone-100 pt-5">
        {kanji.on_readings.length > 0 && (
          <div className="flex items-start gap-3">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider w-16 pt-0.5">
              ON
            </span>
            <div className="flex flex-wrap gap-2">
              {kanji.on_readings.map((r, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-sm font-medium"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
        {kanji.kun_readings.length > 0 && (
          <div className="flex items-start gap-3">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider w-16 pt-0.5">
              KUN
            </span>
            <div className="flex flex-wrap gap-2">
              {kanji.kun_readings.map((r, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-sm font-medium"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Vocabulary */}
      <div className="border-t border-stone-100 px-6 py-5">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
          Vocabulary ({wordCount})
        </h3>
        <div className="space-y-3">
          {kanji.words.map((w, i) => (
            <div key={i} className="bg-stone-50 rounded-xl px-4 py-3">
              <div className="text-xl font-bold text-stone-900">{w.word}</div>
              <div className="text-sm text-indigo-600 mt-0.5">{w.furigana}</div>
              <div className="text-sm text-stone-500 mt-0.5">{w.meaning}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-stone-100 bg-stone-50">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

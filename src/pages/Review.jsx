import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export default function Review() {
  const { reviewQueue } = useProgress();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Vocabulary Review</h1>
          <p className="text-stone-500 text-sm mt-1">
            Words you marked for later review.
          </p>
        </div>
        {reviewQueue.length > 0 && (
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
            {reviewQueue.length} waiting
          </span>
        )}
      </div>

      {reviewQueue.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-10 text-center">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="text-lg font-bold text-stone-900 mb-1">All clear!</h2>
          <p className="text-stone-500 text-sm mb-5">
            No words in your review queue. Keep studying!
          </p>
          <Link
            to="/weeks"
            className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Go to Weeks
          </Link>
        </div>
      ) : (
        <>
          <Link
            to="/review/session"
            className="block w-full text-center py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-base transition-colors shadow-sm"
          >
            ▶ START REVIEW SESSION ({reviewQueue.length})
          </Link>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {reviewQueue.map((item) => (
              <div
                key={item.vocabId}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 flex flex-col items-center text-center"
              >
                {/* Vocabulary word — the flashcard identity */}
                <div className="text-2xl font-bold text-stone-900 mb-1 leading-snug">
                  {item.word}
                </div>
                <div className="text-sm text-indigo-500 mb-1">{item.furigana}</div>
                <div className="text-xs text-stone-500 mb-2">{item.meaning}</div>
                <div className="text-xs text-stone-400 mb-1">Ch. {item.chapter}</div>
                <div className="text-xs text-amber-600 font-medium">
                  {item.attemptCount} attempt{item.attemptCount !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

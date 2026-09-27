import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { ALL_CHAPTERS, ALL_WEEKS, getChaptersByWeek } from '../data/index';
// reviewQueue items now carry .word directly — no kanji lookup needed
import { useProgress } from '../hooks/useProgress';

export default function Dashboard() {
  const { getChapterStats, getWeekStats, reviewQueue } = useProgress();

  const currentWeek = ALL_WEEKS[0];
  const weekChapters = getChaptersByWeek(currentWeek);
  const weekStats = getWeekStats(currentWeek, weekChapters);

  // Last 3 chapters with any assessment activity
  const recentChapters = ALL_CHAPTERS.filter((ch) => {
    const s = getChapterStats(ch);
    return s.assessed > 0;
  }).slice(-3).reverse();

  // Kanji in review queue (show up to 8 characters)
  const reviewKanji = reviewQueue.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome back. Keep studying!</p>
      </div>

      {/* Current week card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Current Week</p>
            <h2 className="text-xl font-bold text-stone-900 mt-0.5">Week {currentWeek}</h2>
          </div>
          <span className="text-3xl">📅</span>
        </div>

        <div className="flex items-center justify-between text-sm text-stone-500 mb-2">
          <span>Progress</span>
          <span className="font-semibold text-stone-700">
            {weekStats.assessed} / {weekStats.total} assessed
          </span>
        </div>
        <ProgressBar value={weekStats.assessed} max={weekStats.total} />

        {weekStats.assessed > 0 && (
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-emerald-600 font-medium">✓ {weekStats.known} known</span>
            <span className="text-amber-500 font-medium">↻ {weekStats.needsReview} review</span>
            <span className="text-stone-500">{weekStats.accuracy}% accuracy</span>
          </div>
        )}

        <Link
          to={`/week/${currentWeek}`}
          className="mt-4 block w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Continue Learning →
        </Link>
      </div>

      {/* Needs review */}
      {reviewKanji.length > 0 && (
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-amber-500 uppercase tracking-wider font-semibold">Needs Review</p>
              <h3 className="text-base font-bold text-stone-900 mt-0.5">
                {reviewQueue.length} kanji waiting
              </h3>
            </div>
            <span className="text-2xl">🔄</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {reviewKanji.map((item) => (
              <span
                key={item.vocabId}
                className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-base font-bold text-stone-900"
              >
                {item.word}
              </span>
            ))}
            {reviewQueue.length > 8 && (
              <span className="px-3 py-1.5 flex items-center bg-stone-100 rounded-xl text-xs text-stone-500 font-medium">
                +{reviewQueue.length - 8}
              </span>
            )}
          </div>

          <Link
            to="/review/session"
            className="block w-full text-center py-2.5 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Start Review Session
          </Link>
        </div>
      )}

      {/* Recent chapters */}
      {recentChapters.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
          <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold mb-3">
            Recent Chapters
          </p>
          <div className="space-y-3">
            {recentChapters.map((ch) => {
              const s = getChapterStats(ch);
              return (
                <Link
                  key={ch.chapter}
                  to={`/chapter/${ch.chapter}`}
                  className="flex items-center justify-between py-2 hover:bg-stone-50 rounded-lg px-2 -mx-2 transition-colors"
                >
                  <div>
                    <div className="text-sm font-semibold text-stone-800">
                      Chapter {ch.chapter}
                    </div>
                    <div className="text-xs text-stone-400">{ch.chapter_title}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <ProgressBar value={s.known} max={s.total} />
                    </div>
                    <span className="text-sm font-bold text-stone-700 w-10 text-right">
                      {s.accuracy}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick links when nothing started */}
      {recentChapters.length === 0 && reviewKanji.length === 0 && (
        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5 text-center">
          <p className="text-stone-600 text-sm">Ready to start? Jump into Week 1.</p>
          <Link
            to="/week/1"
            className="mt-3 inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Go to Week 1 →
          </Link>
        </div>
      )}
    </div>
  );
}

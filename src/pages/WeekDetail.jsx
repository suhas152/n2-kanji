import { Link, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { getChaptersByWeek } from '../data/index';
import { useProgress } from '../hooks/useProgress';

export default function WeekDetail() {
  const { weekId } = useParams();
  const week = parseInt(weekId, 10);
  const chapters = getChaptersByWeek(week);
  const { getChapterStats, getWeekStats } = useProgress();
  const weekStats = getWeekStats(week, chapters);

  if (chapters.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Week {week} not found.</p>
        <Link to="/weeks" className="text-indigo-600 text-sm mt-2 inline-block">← Back to Weeks</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/weeks" className="text-stone-400 hover:text-stone-600 text-sm">← Weeks</Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
        <h1 className="text-2xl font-bold text-stone-900">Week {week}</h1>
        <div className="flex gap-4 text-sm text-stone-500 mt-1 mb-4">
          <span>{chapters.length} chapters</span>
          <span>{weekStats.total} kanji</span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar value={weekStats.assessed} max={weekStats.total} className="flex-1" />
          <span className="text-sm font-bold text-stone-700">
            {weekStats.accuracy > 0 ? `${weekStats.accuracy}%` : '—'}
          </span>
        </div>
        {weekStats.assessed > 0 && (
          <div className="flex gap-4 mt-2 text-xs">
            <span className="text-emerald-600 font-medium">✓ {weekStats.known} known</span>
            <span className="text-amber-500 font-medium">↻ {weekStats.needsReview} review</span>
            <span className="text-stone-400">{weekStats.assessed}/{weekStats.total} assessed</span>
          </div>
        )}
      </div>

      {/* Chapter cards */}
      <div className="space-y-4">
        {chapters.map((ch) => {
          const s = getChapterStats(ch);
          const wordCount = ch.kanji.reduce((sum, k) => sum + k.words.length, 0);

          return (
            <div key={ch.chapter} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-base font-bold text-stone-900">Chapter {ch.chapter}</h3>
                  <p className="text-sm text-stone-500 mt-0.5">{ch.chapter_title}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs text-stone-400 mt-2 mb-3">
                <span>{ch.kanji.length} kanji</span>
                <span>{wordCount} words</span>
              </div>

              {s.assessed > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Assessment</span>
                    <span>{s.accuracy}%</span>
                  </div>
                  <ProgressBar value={s.known} max={s.total} />
                  <div className="flex gap-3 mt-1.5 text-xs">
                    <span className="text-emerald-600">✓ {s.known} known</span>
                    <span className="text-amber-500">↻ {s.needsReview} review</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-3">
                <Link
                  to={`/chapter/${ch.chapter}`}
                  className="flex-1 text-center py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  📖 Chapter
                </Link>
                <Link
                  to={`/chapter/${ch.chapter}/flashcards`}
                  className="flex-1 text-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  🃏 Flashcards
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

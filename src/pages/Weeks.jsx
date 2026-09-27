import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { ALL_WEEKS, getChaptersByWeek } from '../data/index';
import { useProgress } from '../hooks/useProgress';

export default function Weeks() {
  const { getWeekStats } = useProgress();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">All Weeks</h1>

      <div className="space-y-4">
        {ALL_WEEKS.map((week) => {
          const chapters = getChaptersByWeek(week);
          const stats = getWeekStats(week, chapters);
          const totalKanji = chapters.reduce((sum, c) => sum + c.kanji.length, 0);
          const totalWords = chapters.reduce(
            (sum, c) => sum + c.kanji.reduce((s, k) => s + k.words.length, 0),
            0
          );

          return (
            <Link
              key={week}
              to={`/week/${week}`}
              className="block bg-white rounded-2xl border border-stone-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-stone-900">Week {week}</h2>
                <span className="text-xs text-stone-400 font-medium">
                  {chapters.length} chapters
                </span>
              </div>

              <div className="flex gap-4 text-sm text-stone-500 mb-3">
                <span>{totalKanji} kanji</span>
                <span>{totalWords} words</span>
              </div>

              <div className="flex items-center gap-3">
                <ProgressBar value={stats.assessed} max={stats.total} className="flex-1" />
                <span className="text-sm font-semibold text-stone-600 w-12 text-right">
                  {stats.accuracy > 0 ? `${stats.accuracy}%` : '—'}
                </span>
              </div>

              {stats.assessed > 0 && (
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-emerald-600">✓ {stats.known} known</span>
                  <span className="text-amber-500">↻ {stats.needsReview} review</span>
                  <span className="text-stone-400">{stats.assessed}/{stats.total} assessed</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { ALL_WEEKS, getChaptersByWeek } from '../data/index';
import { useProgress } from '../hooks/useProgress';

export default function Weeks() {
  const { getWeekStats } = useProgress();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#f0eeff' }}>All Weeks</h1>
      <div className="space-y-4">
        {ALL_WEEKS.map((week) => {
          const chapters = getChaptersByWeek(week);
          const stats = getWeekStats(week, chapters);
          const totalKanji = chapters.reduce((sum, c) => sum + c.kanji.length, 0);
          const totalWords = chapters.reduce((sum, c) => sum + c.kanji.reduce((s, k) => s + k.words.length, 0), 0);

          return (
            <Link key={week} to={`/week/${week}`} className="block rounded-2xl border p-5 transition-all" style={{ backgroundColor: '#16161d', borderColor: '#2a2a3a' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold" style={{ color: '#f0eeff' }}>Week {week}</h2>
                <span className="text-xs font-medium" style={{ color: '#4a4a5a' }}>{chapters.length} chapters</span>
              </div>
              <div className="flex gap-4 text-sm mb-3" style={{ color: '#6b6b80' }}>
                <span>{totalKanji} kanji</span>
                <span>{totalWords} words</span>
              </div>
              <div className="flex items-center gap-3">
                <ProgressBar value={stats.assessed} max={stats.total} className="flex-1" />
                <span className="text-sm font-bold w-12 text-right" style={{ color: '#c084fc' }}>
                  {stats.accuracy > 0 ? `${stats.accuracy}%` : '—'}
                </span>
              </div>
              {stats.assessed > 0 && (
                <div className="flex gap-4 mt-2 text-xs">
                  <span style={{ color: '#34d399' }}>✓ {stats.known} known</span>
                  <span style={{ color: '#fbbf24' }}>↻ {stats.needsReview} review</span>
                  <span style={{ color: '#4a4a5a' }}>{stats.assessed}/{stats.total} assessed</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

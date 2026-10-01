import { Link, useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { getChaptersByWeek } from '../data/index';
import { useProgress } from '../hooks/useProgress';

const card = 'rounded-2xl border p-5';
const cardStyle = { backgroundColor: '#16161d', borderColor: '#2a2a3a' };

export default function WeekDetail() {
  const { weekId } = useParams();
  const week = parseInt(weekId, 10);
  const chapters = getChaptersByWeek(week);
  const { getChapterStats, getWeekStats } = useProgress();
  const weekStats = getWeekStats(week, chapters);

  if (chapters.length === 0) {
    return (
      <div className="text-center py-20">
        <p style={{ color: '#6b6b80' }}>Week {week} not found.</p>
        <Link to="/weeks" className="text-sm mt-2 inline-block" style={{ color: '#a855f7' }}>← Back to Weeks</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/weeks" className="text-sm" style={{ color: '#6b6b80' }}>← Weeks</Link>
      </div>

      <div className={card} style={cardStyle}>
        <h1 className="text-2xl font-bold" style={{ color: '#f0eeff' }}>Week {week}</h1>
        <div className="flex gap-4 text-sm mt-1 mb-4" style={{ color: '#6b6b80' }}>
          <span>{chapters.length} chapters</span>
          <span>{weekStats.total} vocab cards</span>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar value={weekStats.assessed} max={weekStats.total} className="flex-1" />
          <span className="text-sm font-bold" style={{ color: '#c084fc' }}>
            {weekStats.accuracy > 0 ? `${weekStats.accuracy}%` : '—'}
          </span>
        </div>
        {weekStats.assessed > 0 && (
          <div className="flex gap-4 mt-2 text-xs">
            <span style={{ color: '#34d399' }}>✓ {weekStats.known} known</span>
            <span style={{ color: '#fbbf24' }}>↻ {weekStats.needsReview} review</span>
            <span style={{ color: '#4a4a5a' }}>{weekStats.assessed}/{weekStats.total} assessed</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {chapters.map((ch) => {
          const s = getChapterStats(ch);
          const wordCount = ch.kanji.reduce((sum, k) => sum + k.words.length, 0);
          return (
            <div key={ch.chapter} className={card} style={cardStyle}>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-base font-bold" style={{ color: '#f0eeff' }}>Chapter {ch.chapter}</h3>
                  <p className="text-sm mt-0.5" style={{ color: '#6b6b80' }}>{ch.chapter_title}</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs mt-2 mb-3" style={{ color: '#4a4a5a' }}>
                <span>{ch.kanji.length} kanji</span>
                <span>{wordCount} vocab cards</span>
              </div>
              {s.assessed > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#6b6b80' }}>
                    <span>Assessment</span>
                    <span style={{ color: '#c084fc' }}>{s.accuracy}%</span>
                  </div>
                  <ProgressBar value={s.known} max={s.total} />
                  <div className="flex gap-3 mt-1.5 text-xs">
                    <span style={{ color: '#34d399' }}>✓ {s.known} known</span>
                    <span style={{ color: '#fbbf24' }}>↻ {s.needsReview} review</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-3">
                <Link to={`/chapter/${ch.chapter}`} className="flex-1 text-center py-2.5 font-semibold rounded-xl text-sm transition-colors" style={{ backgroundColor: '#1e1e2a', color: '#9b9bb0', border: '1px solid #2a2a3a' }}>
                  📖 Chapter
                </Link>
                <Link to={`/chapter/${ch.chapter}/flashcards`} className="flex-1 text-center py-2.5 font-semibold rounded-xl text-sm transition-colors" style={{ backgroundColor: '#6d28d9', color: '#f0eeff' }}>
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

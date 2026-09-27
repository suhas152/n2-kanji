import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { ALL_CHAPTERS, ALL_WEEKS, getChaptersByWeek } from '../data/index';
import { useProgress } from '../hooks/useProgress';

export default function Progress() {
  const { getChapterStats, getWeekStats, getOverallStats } = useProgress();
  const overall = getOverallStats(ALL_CHAPTERS);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">Progress</h1>

      {/* Overall */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-3">
          Total Progress
        </h2>
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-3xl font-bold text-stone-900">{overall.assessed}</span>
            <span className="text-stone-400 text-lg"> / {overall.total}</span>
            <p className="text-xs text-stone-400 mt-0.5">kanji assessed</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">
              {overall.accuracy > 0 ? `${overall.accuracy}%` : '—'}
            </div>
            <p className="text-xs text-stone-400">accuracy</p>
          </div>
        </div>
        <ProgressBar value={overall.assessed} max={overall.total} className="mb-3" />
        <div className="flex gap-5 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-stone-600">{overall.known} known</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
            <span className="text-stone-600">{overall.needsReview} review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-200 inline-block"></span>
            <span className="text-stone-600">{overall.total - overall.assessed} untouched</span>
          </div>
        </div>
      </div>

      {/* Per week */}
      {ALL_WEEKS.map((week) => {
        const chapters = getChaptersByWeek(week);
        const ws = getWeekStats(week, chapters);
        return (
          <div key={week} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-stone-900">Week {week}</h2>
              <Link
                to={`/week/${week}`}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                View →
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <ProgressBar value={ws.assessed} max={ws.total} className="flex-1" />
              <span className="text-sm font-bold text-stone-700 w-10 text-right">
                {ws.accuracy > 0 ? `${ws.accuracy}%` : '—'}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-stone-400 mb-4">
              <span className="text-emerald-600">{ws.known} known</span>
              <span className="text-amber-500">{ws.needsReview} review</span>
              <span>{ws.assessed}/{ws.total} assessed</span>
            </div>

            {/* Per chapter rows */}
            <div className="space-y-2.5">
              {chapters.map((ch) => {
                const s = getChapterStats(ch);
                return (
                  <div key={ch.chapter}>
                    <div className="flex items-center justify-between mb-1">
                      <Link
                        to={`/chapter/${ch.chapter}`}
                        className="text-xs font-medium text-stone-600 hover:text-indigo-600"
                      >
                        Ch.{ch.chapter} {ch.chapter_title}
                      </Link>
                      <span className="text-xs text-stone-400">
                        {s.assessed > 0 ? `${s.accuracy}%` : '—'}
                      </span>
                    </div>
                    <ProgressBar value={s.known} max={s.total} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

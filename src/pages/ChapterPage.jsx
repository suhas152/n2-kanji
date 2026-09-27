import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import KanjiCard from '../components/KanjiCard';
import ProgressBar from '../components/ProgressBar';
import { getChapterByNumber } from '../data/index';
import { useProgress } from '../hooks/useProgress';

export default function ChapterPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = getChapterByNumber(parseInt(chapterId, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getChapterStats } = useProgress();

  if (!chapter) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Chapter not found.</p>
        <Link to="/weeks" className="text-indigo-600 text-sm mt-2 inline-block">← Back</Link>
      </div>
    );
  }

  const stats = getChapterStats(chapter);
  const wordCount = chapter.kanji.reduce((sum, k) => sum + k.words.length, 0);
  const kanji = chapter.kanji[currentIndex];

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-400">
        <Link to="/weeks" className="hover:text-stone-600">Weeks</Link>
        <span>/</span>
        <Link to={`/week/${chapter.week}`} className="hover:text-stone-600">Week {chapter.week}</Link>
        <span>/</span>
        <span className="text-stone-600 font-medium">Chapter {chapter.chapter}</span>
      </div>

      {/* Chapter header */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
        <h1 className="text-xl font-bold text-stone-900">Chapter {chapter.chapter}</h1>
        <p className="text-stone-500 text-sm mt-0.5">{chapter.chapter_title}</p>
        <div className="flex gap-4 text-xs text-stone-400 mt-2">
          <span>{chapter.kanji.length} kanji</span>
          <span>{wordCount} words</span>
        </div>
        {stats.assessed > 0 && (
          <div className="mt-3">
            <ProgressBar value={stats.known} max={stats.total} />
            <div className="flex gap-3 mt-1 text-xs">
              <span className="text-emerald-600">✓ {stats.known} known</span>
              <span className="text-amber-500">↻ {stats.needsReview} review</span>
              <span className="text-stone-400">{stats.accuracy}% accuracy</span>
            </div>
          </div>
        )}
      </div>

      {/* Segment tabs */}
      <div className="flex bg-stone-100 rounded-xl p-1 gap-1">
        <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-white text-indigo-700 shadow-sm">
          📖 CHAPTER
        </button>
        <button
          onClick={() => navigate(`/chapter/${chapter.chapter}/flashcards`)}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors"
        >
          🃏 FLASHCARDS
        </button>
      </div>

      {/* Kanji card */}
      <KanjiCard
        kanji={kanji}
        index={currentIndex}
        total={chapter.kanji.length}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(chapter.kanji.length - 1, i + 1))}
      />
    </div>
  );
}

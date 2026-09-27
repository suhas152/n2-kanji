import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import { getChapterByNumber } from '../data/index';
import { useProgress } from '../hooks/useProgress';
import { buildVocabCards } from '../utils/progress';

export default function FlashcardsPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = getChapterByNumber(parseInt(chapterId, 10));
  const { assessVocab } = useProgress();

  // Flat ordered list of vocab cards — exact JSON word order
  const [vocabCards] = useState(() => (chapter ? buildVocabCards(chapter) : []));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState([]); // "KNOWN" | "LATER_REVIEW"
  const [done, setDone] = useState(false);

  if (!chapter) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Chapter not found.</p>
        <Link to="/weeks" className="text-indigo-600 text-sm mt-2 inline-block">← Back</Link>
      </div>
    );
  }

  function advance(status) {
    setSessionResults((prev) => [...prev, status]);
    if (currentIndex + 1 >= vocabCards.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleKnown(vocabCard) {
    assessVocab(vocabCard, 'KNOWN');
    advance('KNOWN');
  }

  function handleReview(vocabCard) {
    assessVocab(vocabCard, 'LATER_REVIEW');
    advance('LATER_REVIEW');
  }

  const knownCount = sessionResults.filter((r) => r === 'KNOWN').length;
  const reviewCount = sessionResults.filter((r) => r === 'LATER_REVIEW').length;

  // ── Session complete screen ──
  if (done) {
    const accuracy = Math.round((knownCount / vocabCards.length) * 100);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-stone-400">
          <Link to={`/week/${chapter.week}`} className="hover:text-stone-600">Week {chapter.week}</Link>
          <span>/</span>
          <Link to={`/chapter/${chapter.chapter}`} className="hover:text-stone-600">Chapter {chapter.chapter}</Link>
          <span>/</span>
          <span className="text-stone-600 font-medium">Results</span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">{accuracy >= 80 ? '🎉' : accuracy >= 50 ? '💪' : '📚'}</div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Session Complete!</h2>
          <p className="text-stone-500 text-sm mb-6">
            Chapter {chapter.chapter} · {chapter.chapter_title}
          </p>

          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{knownCount}</div>
              <div className="text-xs text-stone-400 mt-1">Known</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{reviewCount}</div>
              <div className="text-xs text-stone-400 mt-1">For Review</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{accuracy}%</div>
              <div className="text-xs text-stone-400 mt-1">Accuracy</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCurrentIndex(0); setSessionResults([]); setDone(false); }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              ↻ Redo Flashcards
            </button>
            {reviewCount > 0 && (
              <Link
                to="/review/session"
                className="block w-full py-3 bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-colors text-center"
              >
                Start Review Session ({reviewCount} words)
              </Link>
            )}
            <Link
              to={`/week/${chapter.week}`}
              className="block w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-sm transition-colors text-center"
            >
              ← Back to Week {chapter.week}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Active flashcard screen ──
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-stone-400">
        <Link to="/weeks" className="hover:text-stone-600">Weeks</Link>
        <span>/</span>
        <Link to={`/week/${chapter.week}`} className="hover:text-stone-600">Week {chapter.week}</Link>
        <span>/</span>
        <Link to={`/chapter/${chapter.chapter}`} className="hover:text-stone-600">Chapter {chapter.chapter}</Link>
        <span>/</span>
        <span className="text-stone-600 font-medium">Flashcards</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
        <h1 className="text-lg font-bold text-stone-900">Chapter {chapter.chapter} Flashcards</h1>
        <p className="text-stone-500 text-sm">{chapter.chapter_title}</p>
        <p className="text-xs text-stone-400 mt-1">{vocabCards.length} vocabulary cards</p>
      </div>

      {/* Segment tabs */}
      <div className="flex bg-stone-100 rounded-xl p-1 gap-1">
        <button
          onClick={() => navigate(`/chapter/${chapter.chapter}`)}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-stone-500 hover:text-stone-700 transition-colors"
        >
          📖 CHAPTER
        </button>
        <button className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-white text-indigo-700 shadow-sm">
          🃏 FLASHCARDS
        </button>
      </div>

      {/* Flashcard */}
      <Flashcard
        key={currentIndex}
        vocabCard={vocabCards[currentIndex]}
        index={currentIndex}
        total={vocabCards.length}
        onKnown={handleKnown}
        onReview={handleReview}
      />
    </div>
  );
}

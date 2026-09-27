import { useState } from 'react';
import { Link } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import { useProgress } from '../hooks/useProgress';

export default function ReviewSession() {
  const { reviewQueue, assessVocab, markVocabKnown } = useProgress();

  // Snapshot of the review queue at session start — order preserved
  const [sessionCards] = useState(() => [...reviewQueue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  if (sessionCards.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="text-5xl">✨</div>
        <h2 className="text-xl font-bold text-stone-900">Review queue is empty!</h2>
        <p className="text-stone-500 text-sm">Go study some chapters first.</p>
        <Link
          to="/weeks"
          className="inline-block px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-sm"
        >
          Go to Weeks
        </Link>
      </div>
    );
  }

  function handleKnown(vocabCard) {
    assessVocab(vocabCard, 'KNOWN');
    markVocabKnown(vocabCard.vocabId);
    setResults((prev) => [...prev, 'KNOWN']);
    if (currentIndex + 1 >= sessionCards.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleReview(vocabCard) {
    assessVocab(vocabCard, 'LATER_REVIEW');
    setResults((prev) => [...prev, 'LATER_REVIEW']);
    if (currentIndex + 1 >= sessionCards.length) {
      setDone(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  const knownCount = results.filter((r) => r === 'KNOWN').length;
  const reviewCount = results.filter((r) => r === 'LATER_REVIEW').length;

  if (done) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Review Complete!</h2>
          <p className="text-stone-500 text-sm mb-6">
            {sessionCards.length} word{sessionCards.length !== 1 ? 's' : ''} reviewed
          </p>

          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{knownCount}</div>
              <div className="text-xs text-stone-400 mt-1">Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{reviewCount}</div>
              <div className="text-xs text-stone-400 mt-1">Still reviewing</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/review"
              className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors text-center"
            >
              ← Back to Review Queue
            </Link>
            <Link
              to="/"
              className="block w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-sm transition-colors text-center"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const card = sessionCards[currentIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/review" className="text-stone-400 hover:text-stone-600 text-sm">
          ← Review Queue
        </Link>
        <span className="text-xs text-stone-400">Ch. {card.chapter}</span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
        <h1 className="text-lg font-bold text-stone-900">Review Session</h1>
        <p className="text-stone-500 text-sm">Words you marked for later review</p>
      </div>

      <Flashcard
        key={card.vocabId}
        vocabCard={card}
        index={currentIndex}
        total={sessionCards.length}
        onKnown={handleKnown}
        onReview={handleReview}
      />
    </div>
  );
}

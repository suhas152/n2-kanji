/**
 * Flashcard.jsx
 *
 * Receives a single `vocabCard` object:
 * {
 *   vocabId, word, furigana, meaning, kanjiCharacter,
 *   week, chapter, kanjiNumber, wordIndex
 * }
 *
 * Front  → vocabulary word ONLY (e.g. 看板)
 * Back   → furigana + meaning
 *
 * No kanji character on front. No furigana on front. JSON order preserved upstream.
 */
import { useState } from 'react';

export default function Flashcard({ vocabCard, index, total, onKnown, onReview }) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    if (!flipped) setFlipped(true);
  }

  function handleKnown() {
    setFlipped(false);
    setTimeout(() => onKnown(vocabCard), 50);
  }

  function handleReview() {
    setFlipped(false);
    setTimeout(() => onReview(vocabCard), 50);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Counter */}
      <div className="text-sm font-medium text-stone-500">
        {index + 1} / {total}
      </div>

      {/* Card scene */}
      <div className="flashcard-scene w-full" style={{ height: '340px' }}>
        <div
          className={`flashcard-inner ${flipped ? 'flipped' : ''}`}
          style={{ height: '100%' }}
        >
          {/* ── FRONT: vocabulary word only ── */}
          <div
            className="flashcard-front bg-white border-2 border-stone-200 shadow-md flex flex-col items-center justify-center cursor-pointer select-none rounded-2xl"
            onClick={handleFlip}
          >
            <div className="text-6xl font-bold text-stone-900 leading-none text-center px-6">
              {vocabCard.word}
            </div>
            <p className="mt-10 text-stone-400 text-sm font-medium tracking-widest uppercase">
              Tap to reveal
            </p>
          </div>

          {/* ── BACK: furigana + meaning ── */}
          <div className="flashcard-back bg-white border-2 border-indigo-200 shadow-md flex flex-col items-center justify-center rounded-2xl px-8">
            {/* Vocabulary word repeated for reference */}
            <div className="text-5xl font-bold text-stone-900 leading-none text-center mb-5">
              {vocabCard.word}
            </div>

            {/* Furigana */}
            <div className="text-2xl text-indigo-600 font-semibold mb-3 text-center">
              {vocabCard.furigana}
            </div>

            {/* Meaning */}
            <div className="text-lg text-stone-600 text-center">
              {vocabCard.meaning}
            </div>
          </div>
        </div>
      </div>

      {/* Assessment buttons — only after flip */}
      {flipped && (
        <div className="flex gap-4 w-full">
          <button
            onClick={handleKnown}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-base transition-colors shadow-sm"
          >
            ✓ YES, I KNOW
          </button>
          <button
            onClick={handleReview}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-xl text-base transition-colors shadow-sm"
          >
            ↻ LATER REVIEW
          </button>
        </div>
      )}
    </div>
  );
}

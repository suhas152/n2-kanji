import { useState } from 'react';

export default function Flashcard({ vocabCard, index, total, onKnown, onReview }) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    setFlipped((prev) => !prev);
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
      <div className="text-sm font-medium" style={{ color: '#6b6b80' }}>
        {index + 1} / {total}
      </div>

      {/* Card scene */}
      <div className="flashcard-scene w-full" style={{ height: '340px' }}>
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`} style={{ height: '100%' }}>

          {/* FRONT */}
          <div
            className="flashcard-front flex flex-col items-center justify-center cursor-pointer select-none rounded-2xl border"
            style={{ backgroundColor: '#16161d', borderColor: '#2a2a3a' }}
            onClick={handleFlip}
          >
            <div className="font-bold leading-none text-center px-6" style={{ fontSize: '4.5rem', color: '#f0eeff' }}>
              {vocabCard.word}
            </div>
            <p className="mt-10 text-xs font-semibold tracking-widest uppercase" style={{ color: '#4a4a5a' }}>
              TAP TO REVEAL
            </p>
          </div>

          {/* BACK */}
          <div
            className="flashcard-back flex flex-col items-center justify-center rounded-2xl border cursor-pointer select-none px-8"
            style={{ backgroundColor: '#1a1025', borderColor: '#6d28d9' }}
            onClick={handleFlip}
          >
            <div className="font-bold leading-none text-center mb-5" style={{ fontSize: '3.5rem', color: '#f0eeff' }}>
              {vocabCard.word}
            </div>
            <div className="text-2xl font-bold mb-3 text-center" style={{ color: '#c084fc' }}>
              {vocabCard.furigana}
            </div>
            <div className="text-lg text-center" style={{ color: '#b0adc8' }}>
              {vocabCard.meaning}
            </div>
            <p className="mt-6 text-xs font-semibold tracking-widest uppercase" style={{ color: '#3a2a4a' }}>
              TAP TO FLIP BACK
            </p>
          </div>
        </div>
      </div>

      {/* Assessment buttons — back only */}
      {flipped && (
        <div className="flex gap-4 w-full">
          <button
            onClick={handleKnown}
            className="flex-1 flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-base transition-all"
            style={{ backgroundColor: '#166534', color: '#bbf7d0', border: '1px solid #15803d' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#14532d'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#166534'}
          >
            ✓ YES, I KNOW
          </button>
          <button
            onClick={handleReview}
            className="flex-1 flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-base transition-all"
            style={{ backgroundColor: '#78350f', color: '#fde68a', border: '1px solid #92400e' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#451a03'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#78350f'}
          >
            ↻ LATER REVIEW
          </button>
        </div>
      )}
    </div>
  );
}

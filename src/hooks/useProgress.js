import { useCallback, useState } from 'react';
import {
  getChapterStats,
  getOverallStats,
  getReviewQueue,
  getWeekStats,
  loadProgress,
  recordVocabAssessment,
  removeVocabFromReview,
} from '../utils/progress';

export function useProgress() {
  const [, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  /**
   * Assess a single vocab card.
   * vocabCard: { vocabId, week, chapter, kanjiNumber, wordIndex, word, furigana, meaning, kanjiCharacter }
   * status: "KNOWN" | "LATER_REVIEW"
   */
  const assessVocab = useCallback(
    (vocabCard, status) => {
      recordVocabAssessment(vocabCard, status);
      refresh();
    },
    [refresh]
  );

  /** Mark a vocab card as known and remove from review queue */
  const markVocabKnown = useCallback(
    (vocabId) => {
      removeVocabFromReview(vocabId);
      refresh();
    },
    [refresh]
  );

  return {
    allProgress: loadProgress(),
    reviewQueue: getReviewQueue(),
    assessVocab,
    markVocabKnown,
    getChapterStats,
    getWeekStats,
    getOverallStats,
    refresh,
  };
}

/**
 * progress.js
 *
 * Assessment identity is now PER VOCABULARY WORD, not per kanji character.
 *
 * Stable vocab card ID format:
 *   w{week}-ch{chapter}-k{kanjiNumber}-v{wordIndex}
 *
 * Example:  w1-ch7-k81-v0  →  看板
 *           w1-ch7-k81-v1  →  看護師
 *
 * The JSON is never modified. All assessment data lives in localStorage only.
 */

const STORAGE_KEY = 'vocab_progress_v2';

// ─── ID helpers ────────────────────────────────────────────────────────────

export function makeVocabId(week, chapter, kanjiNumber, wordIndex) {
  return `w${week}-ch${chapter}-k${kanjiNumber}-v${wordIndex}`;
}

/**
 * Build a flat ordered array of vocab-card descriptors from a chapter object.
 * Preserves exact word order from JSON.
 */
export function buildVocabCards(chapterData) {
  const cards = [];
  for (const kanji of chapterData.kanji) {
    kanji.words.forEach((word, wordIndex) => {
      cards.push({
        vocabId: makeVocabId(chapterData.week, chapterData.chapter, kanji.number, wordIndex),
        week: chapterData.week,
        chapter: chapterData.chapter,
        kanjiNumber: kanji.number,
        wordIndex,
        word: word.word,
        furigana: word.furigana,
        meaning: word.meaning,
        // Keep the parent kanji for context in Review page
        kanjiCharacter: kanji.character,
      });
    });
  }
  return cards;
}

// ─── Storage ───────────────────────────────────────────────────────────────

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProgress(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ─── Assessment ────────────────────────────────────────────────────────────

/**
 * Record an assessment for a single vocabulary card.
 * vocabCard: { vocabId, week, chapter, kanjiNumber, wordIndex, word, furigana, meaning, kanjiCharacter }
 * status: "KNOWN" | "LATER_REVIEW"
 */
export function recordVocabAssessment(vocabCard, status) {
  const all = loadProgress();
  const idx = all.findIndex((r) => r.vocabId === vocabCard.vocabId);
  const now = new Date().toISOString();

  if (idx === -1) {
    all.push({
      vocabId: vocabCard.vocabId,
      week: vocabCard.week,
      chapter: vocabCard.chapter,
      kanjiNumber: vocabCard.kanjiNumber,
      wordIndex: vocabCard.wordIndex,
      word: vocabCard.word,
      furigana: vocabCard.furigana,
      meaning: vocabCard.meaning,
      kanjiCharacter: vocabCard.kanjiCharacter,
      status,
      attemptCount: 1,
      knownCount: status === 'KNOWN' ? 1 : 0,
      reviewCount: status === 'LATER_REVIEW' ? 1 : 0,
      lastReviewedAt: now,
    });
  } else {
    all[idx] = {
      ...all[idx],
      status,
      attemptCount: all[idx].attemptCount + 1,
      knownCount: all[idx].knownCount + (status === 'KNOWN' ? 1 : 0),
      reviewCount: all[idx].reviewCount + (status === 'LATER_REVIEW' ? 1 : 0),
      lastReviewedAt: now,
    };
  }

  saveProgress(all);
  return all;
}

/** Mark a vocab card as KNOWN and remove from active review queue */
export function removeVocabFromReview(vocabId) {
  const all = loadProgress();
  const idx = all.findIndex((r) => r.vocabId === vocabId);
  if (idx !== -1) {
    all[idx].status = 'KNOWN';
    saveProgress(all);
  }
}

/** Return all vocab cards currently in the review queue */
export function getReviewQueue() {
  return loadProgress().filter((r) => r.status === 'LATER_REVIEW');
}

// ─── Stats ─────────────────────────────────────────────────────────────────

/** Chapter-level stats — based on vocab card count */
export function getChapterStats(chapterData) {
  const all = loadProgress();
  const totalVocab = chapterData.kanji.reduce((sum, k) => sum + k.words.length, 0);
  const chapterRecords = all.filter((r) => r.chapter === chapterData.chapter);
  const assessed = chapterRecords.length;
  const known = chapterRecords.filter((r) => r.status === 'KNOWN').length;
  const needsReview = chapterRecords.filter((r) => r.status === 'LATER_REVIEW').length;
  const accuracy = assessed > 0 ? Math.round((known / assessed) * 100) : 0;
  return { total: totalVocab, assessed, known, needsReview, accuracy };
}

/** Week-level stats */
export function getWeekStats(weekNumber, chapters) {
  const all = loadProgress();
  const totalVocab = chapters.reduce(
    (sum, c) => sum + c.kanji.reduce((s, k) => s + k.words.length, 0),
    0
  );
  const weekRecords = all.filter((r) => r.week === weekNumber);
  const assessed = weekRecords.length;
  const known = weekRecords.filter((r) => r.status === 'KNOWN').length;
  const needsReview = weekRecords.filter((r) => r.status === 'LATER_REVIEW').length;
  const accuracy = assessed > 0 ? Math.round((known / assessed) * 100) : 0;
  return { total: totalVocab, assessed, known, needsReview, accuracy };
}

/** Overall stats across all provided chapters */
export function getOverallStats(allChapters) {
  const all = loadProgress();
  const totalVocab = allChapters.reduce(
    (sum, c) => sum + c.kanji.reduce((s, k) => s + k.words.length, 0),
    0
  );
  const assessed = all.length;
  const known = all.filter((r) => r.status === 'KNOWN').length;
  const needsReview = all.filter((r) => r.status === 'LATER_REVIEW').length;
  const accuracy = assessed > 0 ? Math.round((known / assessed) * 100) : 0;
  return { total: totalVocab, assessed, known, needsReview, accuracy };
}

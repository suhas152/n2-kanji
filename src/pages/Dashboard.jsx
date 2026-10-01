import { useMemo, useState } from 'react';
import { ALL_WEEKS, getChaptersByWeek } from '../data/index';

const shellStyle = { backgroundColor: '#16161d', borderColor: '#2a2a3a' };
const tileBaseStyle = { backgroundColor: '#fff7ed', borderColor: '#f97316', color: '#111827' };
const tileActiveStyle = { backgroundColor: '#fb923c', borderColor: '#fdba74', color: '#111827' };

export default function Dashboard() {
  const weekSections = useMemo(
    () => ALL_WEEKS.map((week) => ({ week, chapters: getChaptersByWeek(week) })),
    []
  );
  const [selectedKanjiKey, setSelectedKanjiKey] = useState(null);

  const selectedKanjiLookup = useMemo(() => {
    if (!selectedKanjiKey) {
      return null;
    }

    for (const { week, chapters } of weekSections) {
      for (const chapter of chapters) {
        for (const kanji of chapter.kanji) {
          const key = `${week}-${chapter.chapter}-${kanji.number}`;
          if (key === selectedKanjiKey) {
            return { week, chapter, kanji, key };
          }
        }
      }
    }

    return null;
  }, [selectedKanjiKey, weekSections]);

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border p-6" style={shellStyle}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#f97316' }}>
          N2 Kanji List
        </p>
        <h1 className="mt-3 text-3xl font-bold" style={{ color: '#f0eeff' }}>
          All kanji in weekly chapter order
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#9b9bb0' }}>
          Tap any kanji to open a box with ON, KUN, and example words without furigana.
        </p>
      </div>

      {weekSections.map(({ week, chapters }) => (
        <section
          key={week}
          className="rounded-[28px] border p-5 md:p-6"
          style={{ backgroundColor: '#120d08', borderColor: '#7c2d12' }}
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#fdba74' }}>
                Week {week}
              </p>
              <h2 className="mt-2 text-2xl font-bold" style={{ color: '#fff7ed' }}>
                {chapters.length} chapters
              </h2>
            </div>
            <p className="text-sm" style={{ color: '#fdba74' }}>
              {chapters.reduce((sum, chapter) => sum + chapter.kanji.length, 0)} kanji
            </p>
          </div>

          <div className="space-y-5">
            {chapters.map((chapter) => {
              const selectedEntry =
                selectedKanjiLookup && selectedKanjiLookup.chapter.chapter === chapter.chapter
                  ? selectedKanjiLookup
                  : null;

              return (
                <div
                  key={chapter.chapter}
                  className="rounded-[24px] border p-4 md:p-5"
                  style={{ backgroundColor: '#2a140a', borderColor: '#9a3412' }}
                >
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#fdba74' }}>
                        Chapter {chapter.chapter}
                      </p>
                      <h3 className="mt-2 text-lg font-bold" style={{ color: '#fff7ed' }}>
                        {chapter.chapter_title}
                      </h3>
                    </div>
                    <span className="text-sm" style={{ color: '#fed7aa' }}>
                      {chapter.kanji.length} kanji
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
                    {chapter.kanji.map((kanji) => {
                      const key = `${week}-${chapter.chapter}-${kanji.number}`;
                      const isActive = key === selectedKanjiKey;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedKanjiKey(key)}
                          className="aspect-square rounded-2xl border text-4xl font-bold transition-transform duration-150 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-300"
                          style={isActive ? tileActiveStyle : tileBaseStyle}
                          aria-pressed={isActive}
                          aria-label={`Open details for ${kanji.character}`}
                        >
                          {kanji.character}
                        </button>
                      );
                    })}
                  </div>

                  {selectedEntry && (
                    <div
                      className="mt-4 rounded-[24px] border p-5"
                      style={{ backgroundColor: '#fff7ed', borderColor: '#fdba74', color: '#111827' }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#9a3412' }}>
                            Week {selectedEntry.week} • Chapter {selectedEntry.chapter.chapter}
                          </p>
                          <div className="mt-3 flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border text-5xl font-bold" style={{ borderColor: '#fdba74', backgroundColor: '#ffffff' }}>
                              {selectedEntry.kanji.character}
                            </div>
                            <div>
                              <p className="text-sm font-medium" style={{ color: '#9a3412' }}>
                                Kanji #{selectedEntry.kanji.number}
                              </p>
                              <p className="text-sm" style={{ color: '#7c2d12' }}>
                                {selectedEntry.kanji.stroke_count} strokes
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedKanjiKey(null)}
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{ backgroundColor: '#fed7aa', color: '#7c2d12' }}
                        >
                          Close
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border p-4" style={{ borderColor: '#fdba74', backgroundColor: '#ffffff' }}>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#9a3412' }}>
                            ON
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedEntry.kanji.on_readings.length > 0 ? (
                              selectedEntry.kanji.on_readings.map((reading) => (
                                <span
                                  key={reading}
                                  className="rounded-full px-3 py-1 text-sm font-semibold"
                                  style={{ backgroundColor: '#ffedd5', color: '#9a3412' }}
                                >
                                  {reading}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm" style={{ color: '#78716c' }}>
                                None
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="rounded-2xl border p-4" style={{ borderColor: '#fdba74', backgroundColor: '#ffffff' }}>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#9a3412' }}>
                            KUN
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedEntry.kanji.kun_readings.length > 0 ? (
                              selectedEntry.kanji.kun_readings.map((reading) => (
                                <span
                                  key={reading}
                                  className="rounded-full px-3 py-1 text-sm font-semibold"
                                  style={{ backgroundColor: '#ffedd5', color: '#9a3412' }}
                                >
                                  {reading}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm" style={{ color: '#78716c' }}>
                                None
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: '#fdba74', backgroundColor: '#ffffff' }}>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#9a3412' }}>
                          Words
                        </p>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                          {selectedEntry.kanji.words.map((word) => (
                            <div
                              key={`${selectedEntry.kanji.number}-${word.word}`}
                              className="rounded-2xl border p-3"
                              style={{ borderColor: '#fed7aa', backgroundColor: '#fff7ed' }}
                            >
                              <p className="text-xl font-bold" style={{ color: '#111827' }}>
                                {word.word}
                              </p>
                              <p className="mt-1 text-sm" style={{ color: '#57534e' }}>
                                {word.meaning}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

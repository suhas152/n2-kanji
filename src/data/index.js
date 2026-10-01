// Central registry — add new chapters here as you go.

// Week 1 (chapters 1–7)
import w1c1 from './week1/chapter1.json';
import w1c2 from './week1/chapter2.json';
import w1c3 from './week1/chapter3.json';
import w1c4 from './week1/chapter4.json';
import w1c5 from './week1/chapter5.json';
import w1c6 from './week1/chapter6.json';
import w1c7 from './week1/chapter7.json';

// Week 2 (chapters 8–14)
import w2c1 from './week2/chapter1.json';
import w2c2 from './week2/chapter2.json';
import w2c3 from './week2/chapter3.json';
import w2c4 from './week2/chapter4.json';
import w2c5 from './week2/chapter5.json';
import w2c6 from './week2/chapter6.json';
import w2c7 from './week2/chapter7.json';

// Week 3 (chapters 15–21)
import w3c1 from './week3/chapter1.json';
import w3c2 from './week3/chapter2.json';
import w3c3 from './week3/chapter3.json';
import w3c4 from './week3/chapter4.json';
import w3c5 from './week3/chapter5.json';
import w3c6 from './week3/chapter6.json';
import w3c7 from './week3/chapter7.json';

// Week 4 (chapters 22–28)
import w4c1 from './week4/chapter1.json';
import w4c2 from './week4/chapter2.json';
import w4c3 from './week4/chapter3.json';
import w4c4 from './week4/chapter4.json';
import w4c5 from './week4/chapter5.json';
import w4c6 from './week4/chapter6.json';
import w4c7 from './week4/chapter7.json';

// Week 5 (chapters 29–35)
import w5c1 from './week5/chapter1.json';
import w5c2 from './week5/chapter2.json';
import w5c3 from './week5/chapter3.json';
import w5c4 from './week5/chapter4.json';
import w5c5 from './week5/chapter5.json';
import w5c6 from './week5/chapter6.json';
import w5c7 from './week5/chapter7.json';

// Week 6 (chapters 36–42)
import w6c1 from './week6/chapter1.json';
import w6c2 from './week6/chapter2.json';
import w6c3 from './week6/chapter3.json';
import w6c4 from './week6/chapter4.json';
import w6c5 from './week6/chapter5.json';
import w6c6 from './week6/chapter6.json';
import w6c7 from './week6/chapter7.json';

// Week 7 (chapters 43–49)
import w7c1 from './week7/chapter1.json';
import w7c2 from './week7/chapter2.json';
import w7c3 from './week7/chapter3.json';
import w7c4 from './week7/chapter4.json';
import w7c5 from './week7/chapter5.json';
import w7c6 from './week7/chapter6.json';
import w7c7 from './week7/chapter7.json';

// Week 8 (chapters 50–56)
import w8c1 from './week8/chapter1.json';
import w8c2 from './week8/chapter2.json';
import w8c3 from './week8/chapter3.json';
import w8c4 from './week8/chapter4.json';
import w8c5 from './week8/chapter5.json';
import w8c6 from './week8/chapter6.json';
import w8c7 from './week8/chapter7.json';

export const ALL_CHAPTERS = [
  w1c1, w1c2, w1c3, w1c4, w1c5, w1c6, w1c7,
  w2c1, w2c2, w2c3, w2c4, w2c5, w2c6, w2c7,
  w3c1, w3c2, w3c3, w3c4, w3c5, w3c6, w3c7,
  w4c1, w4c2, w4c3, w4c4, w4c5, w4c6, w4c7,
  w5c1, w5c2, w5c3, w5c4, w5c5, w5c6, w5c7,
  w6c1, w6c2, w6c3, w6c4, w6c5, w6c6, w6c7,
  w7c1, w7c2, w7c3, w7c4, w7c5, w7c6, w7c7,
  w8c1, w8c2, w8c3, w8c4, w8c5, w8c6, w8c7,
];

export const ALL_WEEKS = [...new Set(ALL_CHAPTERS.map((c) => c.week))].sort(
  (a, b) => a - b
);

export function getChaptersByWeek(weekNumber) {
  return ALL_CHAPTERS.filter((c) => c.week === weekNumber);
}

export function getChapterByNumber(chapterNumber) {
  return ALL_CHAPTERS.find((c) => c.chapter === chapterNumber) || null;
}

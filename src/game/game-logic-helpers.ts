import { Word } from "./types";
export function getCompletedWords(words: Word[]): Word[] {
  return words.filter((w) => w.completed);
}

export function getWordsPerMinute(words: Word[], time: number) {
  const completedWords = getCompletedWords(words);
  return completedWords.length === 0
    ? 0
    : ((completedWords.length / time) * 60).toFixed(2);
}

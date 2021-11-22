import { Word, Typo } from "../types";
import compliments from "../compliments.json";
export function getCompletedWords(words: Word[]): Word[] {
  return words.filter((w) => w.completed);
}

export function getSanitizedString(string: string) {
  return string.trim().toLowerCase();
}
export function isFullMatch(inputValue: string, currentWord: Word) {
  return (
    inputValue.length === currentWord.value.length &&
    inputValue === currentWord.value
  );
}
export function isPartialMatch(inputValue: string, currentWord: Word) {
  return (
    inputValue.length > 0 &&
    inputValue === currentWord.value.substring(0, inputValue.length)
  );
}
export function getWordsPerMinute(words: Word[], time: number) {
  const completedWords = getCompletedWords(words);
  return completedWords.length === 0
    ? 0
    : ((completedWords.length / time) * 60).toFixed(2);
}

export function getCompliment() {
  const compliment =
    compliments[Math.floor(Math.random() * compliments.length)];
  return compliment;
}

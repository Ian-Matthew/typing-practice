import { Word } from "../types";
export async function getWords(): Promise<Word[]> {
  const response = await window.fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const data = await response.json();
  return data.map((word: Word) => ({ value: word, completed: false }));
}

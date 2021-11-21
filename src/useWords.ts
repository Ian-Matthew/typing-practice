import React from "react";
export function useWords() {
  const [words, setWords] = React.useState([]);
  const [activeWordIndex, setActiveWordIndex] = React.useState(0);

  async function fetchWords() {
    const response = await window.fetch(
      "https://random-word-api.herokuapp.com/word?number=100"
    );
    const data = await response.json();
    setWords(data)
  }

  const shouldFetchWords = activeWordIndex === 0 || words.length - activeWordIndex === 5;


  // whenever activeWordIndex is close to 100, fetch new words
  React.useEffect(() => {
    if(shouldFetchWords) {
      fetchWords()
    }
 
  }, [shouldFetchWords]);

  function goToNextWord() {
    setActiveWordIndex(activeWordIndex + 1)
  }

  return {
    activeWord: words[activeWordIndex]?.trim(), goToNextWord
  }
}
      
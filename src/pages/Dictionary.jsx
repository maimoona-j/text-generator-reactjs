// import React from "react";
import { useState } from "react";

export default function Dictionary() {
  const [inputValue, setInputValue] = useState("");
  const [infoText, setInfoText] = useState("Type a word and press enter");
  const [wordTitle, setWordTitle] = useState("");
  const [meaning, setMeaning] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [showMeaningContainer, setShowMeaningContainer] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  async function fetchAPI(word) {
    try {
      setInfoText(`Searching the meaning of "${word}"`);
      setShowMeaningContainer(false);

      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.title) {
        setWordTitle(word);
        setMeaning("N/A");
        setShowAudio(false);
      } else {
        setWordTitle(result[0].word);
        setMeaning(result[0].meanings[0].definitions[0].definition);
        setAudioSrc(result[0].phonetics[0].audio);
        setShowAudio(true);
      }
      setShowMeaningContainer(true);
      setInfoText("");
    } catch (error) {
      console.log(error);
      setInfoText("An error occurred. Please try again later.");
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchAPI(inputValue);
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="container bg-blue-500 bg-opacity-30 p-6 rounded-2xl shadow-md w-90% max-w-md m-10 flex flex-col items-center justify-center font-cursive text-lg font-semibold">
        <h1 className="text-2xl mb-4">English Dictionary</h1>
        <input
          type="text"
          className="h-14 w-72 bg-white bg-opacity-60 border border-opacity-40 rounded-md px-4 text-lg font-cursive"
          placeholder="Search a word"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <p className="text-gray-500 mt-2">{infoText}</p>

        {showMeaningContainer && (
          <div className="meaning-container">
            <p>
              Word Title: <span className="title">{wordTitle}</span>
            </p>
            <p>
              Meaning: <span className="meaning">{meaning}</span>
            </p>
            {showAudio && <audio src={audioSrc} controls />}
          </div>
        )}
      </div>
    </div>
  );
}

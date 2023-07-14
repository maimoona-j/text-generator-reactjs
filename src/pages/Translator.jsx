import React, { useState } from "react";
import countries from "./countries";

export default function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("ur-PK");

  const handleInputChange = (event) => {
    setFromText(event.target.value);
    setToText("");
  };

  const handleTranslate = () => {
    if (!fromText) return;
    setToText("Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.matches)) {
          data.matches.forEach((match) => {
            if (match.id === 0) {
              setToText(match.translation);
            }
          });
        } else {
          setToText(data.responseData.translatedText);
        }
      })
      .catch((error) => {
        console.error("Translation error:", error);
        setToText("Translation failed");
      });
  };

  return (
    <>
      <div className="container mt-16 mx-auto text-center px-4 py-8">
        <h1 className="text-2xl text-blue-900 font-bold mb-4">Translator</h1>
        <div className="wrapper">
          <div className="text-input grid grid-cols-1 md:grid-cols-2">
            <div className="ml-0 md:ml-36 md:mr-0">
              <select
                className="select-dropdown row from w-full md:w-56 border-2 border-blue-900 h-10 mb-2 ml-0 md:ml-[190px] rounded-md"
                value={translateFrom}
                onChange={(event) => setTranslateFrom(event.target.value)}
              >
                {Object.keys(countries).map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {countries[countryCode]}
                  </option>
                ))}
              </select>
              <textarea
                className="from-text w-full md:w-[450px] p-2 border-2 border-blue-900 h-40 mb-2"
                placeholder="Enter text to translate"
                value={fromText}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mt-8 md:mt-0 ml-0 md:mr-36">
              <select
                className="select-dropdown row to w-full md:w-56 border-2 border-blue-900 h-10 mb-2 ml-0 md:ml-[210px] rounded-md"
                value={translateTo}
                onChange={(event) => setTranslateTo(event.target.value)}
              >
                {Object.keys(countries).map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {countries[countryCode]}
                  </option>
                ))}
              </select>
              <textarea
                className="to-text w-full md:w-[450px] p-2 border-2 border-blue-900 h-40 mb-2"
                placeholder="Translation"
                value={toText}
                readOnly
              ></textarea>
            </div>
          </div>

          <button
            className="px-4 py-2 bg-blue-900 text-white w-48 rounded-md hover:bg-gray-500"
            onClick={handleTranslate}
          >
            Translate
          </button>
        </div>
      </div>
    </>
  );
}

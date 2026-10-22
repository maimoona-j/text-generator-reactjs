
import { useRef, useState } from "react";

export default function Dictionary() {
  const [inputValue, setInputValue] = useState("");
  const [wordTitle, setWordTitle] = useState("");
  const [entries, setEntries] = useState([]);
  const [pronunciation, setPronunciation] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [infoText, setInfoText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef(null);

  async function fetchAPI(word) {
    const searchWord = word.trim();

    if (!searchWord) {
      setInfoText("Enter a word to discover its meaning.");
      inputRef.current?.focus();
      return;
    }

    window.speechSynthesis?.cancel();
    setLoading(true);
    setInfoText("");
    setEntries([]);
    setWordTitle("");
    setPronunciation("");
    setSourceUrl("");
    setCopied(false);

    try {
      const url = `https://freedictionaryapi.com/api/v1/entries/en/${encodeURIComponent(
        searchWord
      )}`;

      const response = await fetch(url);

      if (response.status === 404) {
        throw new Error("Word not found. Check the spelling or try another word.");
      }

      if (response.status === 429) {
        throw new Error(
          "The dictionary request limit has been reached. Please try again later."
        );
      }

      if (!response.ok) {
        throw new Error("Unable to load the definition. Please try again.");
      }

      const result = await response.json();

      const validEntries = (result.entries || []).filter((entry) =>
        (entry.senses || []).some((sense) => sense.definition)
      );

      if (!validEntries.length) {
        throw new Error("No definitions were found for this word.");
      }

      setWordTitle(result.word || searchWord);
      setEntries(validEntries);

      const phonetic = validEntries
        .flatMap((entry) => entry.pronunciations || [])
        .find((item) => item.text)?.text;

      setPronunciation(phonetic || "");
      setSourceUrl(result.source?.url || "");
    } catch (error) {
      setInfoText(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetchAPI(inputValue);
  }

  function handleNewSearch() {
    window.speechSynthesis?.cancel();
    setInputValue("");
    setWordTitle("");
    setEntries([]);
    setPronunciation("");
    setSourceUrl("");
    setInfoText("");
    setCopied(false);
    inputRef.current?.focus();
  }

  function speakWord() {
    if (!("speechSynthesis" in window)) {
      setInfoText("Speech playback is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(wordTitle);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }

  async function copyDefinition(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setInfoText("Unable to copy text. Please select and copy it manually.");
    }
  }

  function searchRelatedWord(word) {
    setInputValue(word);
    fetchAPI(word);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAF9] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/15">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 5.5v17M8 7h8M8 11h8M8 15h5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mb-2 text-sm font-semibold tracking-wide text-teal-700">
            YOUR WORD EXPLORER
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            English Dictionary
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Discover meanings, explore examples, and grow your vocabulary
            one word at a time.
          </p>
        </header>

        {/* Main card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
          {/* Search */}
          <div className="border-b border-slate-100 p-4 sm:p-6 lg:p-7">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="dictionary-search"
                className="mb-3 block text-sm font-semibold text-slate-800"
              >
                What word would you like to explore?
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-[#FCFDFD] px-4 transition focus-within:border-teal-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-600/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5 shrink-0 text-slate-400"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path
                      d="m16 16 4 4"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    ref={inputRef}
                    id="dictionary-search"
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Enter an English word..."
                    autoComplete="off"
                    className="h-12 min-w-0 flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => {
                        setInputValue("");
                        inputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="3"
                            opacity=".25"
                          />
                          <path
                            d="M21 12a9 9 0 0 0-9-9"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Searching
                      </>
                    ) : (
                      "Search"
                    )}
                  </button>

                  {wordTitle && (
                    <button
                      type="button"
                      onClick={handleNewSearch}
                      className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 sm:px-4"
                    >
                      New search
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Search a word to see its definitions, pronunciation, and related words.
              </p>
            </form>
          </div>

          {/* Results */}
          <div className="min-h-[260px] p-4 sm:p-6 lg:p-7">
            {loading && (
              <div
                role="status"
                className="flex min-h-[260px] flex-col items-center justify-center text-center"
              >
                <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-700" />
                <p className="font-semibold text-slate-800">
                  Looking up your word
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Finding definitions and examples...
                </p>
              </div>
            )}

            {!loading && infoText && (
              <div
                role="status"
                className="flex min-h-[180px] items-center justify-center text-center"
              >
                <div className="max-w-md rounded-2xl border border-slate-200 bg-[#F8FAF9] px-5 py-6">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        d="M12 11v5m0-8h.01"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {infoText}
                  </p>
                </div>
              </div>
            )}

            {!loading && !infoText && !wordTitle && (
              <div className="flex min-h-[280px] flex-col items-center justify-center px-3 py-8 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 5.5v17M8 7h8M8 11h8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Your next word starts here
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Enter a word above to explore what it means, how it is
                  used, and which words are related to it.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="mr-1 text-xs font-medium text-slate-400">
                    Try:
                  </span>
                  {["curious", "resilient", "brilliant"].map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => {
                        setInputValue(word);
                        fetchAPI(word);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!loading && wordTitle && entries.length > 0 && (
              <article>
                {/* Word title */}
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                      WORD DEFINITION
                    </span>

                    <h2 className="mt-3 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                      {wordTitle}
                    </h2>

                    {pronunciation && (
                      <p className="mt-2 break-words text-sm text-slate-500">
                        {pronunciation}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={speakWord}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 sm:px-4"
                    aria-label={`Listen to ${wordTitle}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M11 5 6 9H3v6h3l5 4z" />
                      <path
                        d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"
                        strokeLinecap="round"
                      />
                    </svg>
                    Listen
                  </button>
                </div>

                {/* Definitions */}
                <div className="space-y-7">
                  {entries.map((entry, entryIndex) => {
                    const senses = (entry.senses || []).filter(
                      (sense) => sense.definition
                    );

                    const synonyms = [
                      ...new Set([
                        ...(entry.synonyms || []),
                        ...senses.flatMap((sense) => sense.synonyms || []),
                      ]),
                    ].filter(Boolean);

                    const antonyms = [
                      ...new Set([
                        ...(entry.antonyms || []),
                        ...senses.flatMap((sense) => sense.antonyms || []),
                      ]),
                    ].filter(Boolean);

                    return (
                      <section
                        key={`${entry.partOfSpeech || "entry"}-${entryIndex}`}
                        className="border-t border-slate-100 pt-6 first:border-0 first:pt-0"
                      >
                        {entry.partOfSpeech && (
                          <div className="mb-4">
                            <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
                              {entry.partOfSpeech}
                            </span>
                          </div>
                        )}

                        <ol className="space-y-5">
                          {senses.map((sense, senseIndex) => (
                            <li
                              key={senseIndex}
                              className="flex min-w-0 items-start gap-3"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-800">
                                {senseIndex + 1}
                              </span>

                              <div className="min-w-0 flex-1">
                                <p className="break-words text-sm leading-7 text-slate-700 sm:text-base">
                                  {sense.definition}
                                </p>

                                {sense.examples?.[0] && (
                                  <div className="mt-3 rounded-r-xl border-l-2 border-teal-300 bg-[#F8FAF9] px-4 py-3">
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                      Example
                                    </p>
                                    <p className="break-words text-sm italic leading-6 text-slate-600">
                                      “{sense.examples[0]}”
                                    </p>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>

                        {/* Synonyms */}
                        {synonyms.length > 0 && (
                          <div className="mt-6">
                            <h3 className="mb-3 text-sm font-semibold text-slate-800">
                              Similar words
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {synonyms.slice(0, 10).map((word) => (
                                <button
                                  key={word}
                                  type="button"
                                  onClick={() => searchRelatedWord(word)}
                                  className="max-w-full break-words rounded-full border border-teal-100 bg-teal-50/70 px-3 py-1.5 text-sm text-teal-800 transition hover:border-teal-300 hover:bg-teal-100"
                                >
                                  {word}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Antonyms */}
                        {antonyms.length > 0 && (
                          <div className="mt-5">
                            <h3 className="mb-3 text-sm font-semibold text-slate-800">
                              Opposite words
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {antonyms.slice(0, 10).map((word) => (
                                <button
                                  key={word}
                                  type="button"
                                  onClick={() => searchRelatedWord(word)}
                                  className="max-w-full break-words rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                                >
                                  {word}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>

                {/* Footer */}
                <footer className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-slate-400">
                    Definitions provided by{" "}
                    <a
                      href="https://freedictionaryapi.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900"
                    >
                      FreeDictionaryAPI
                    </a>
                    .
                    {sourceUrl && (
                      <>
                        {" "}
                        <a
                          href={sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900"
                        >
                          View original source
                        </a>
                      </>
                    )}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      copyDefinition(
                        `${wordTitle}\n\n${entries
                          .map((entry) =>
                            `${entry.partOfSpeech || ""}\n${(entry.senses || [])
                              .filter((sense) => sense.definition)
                              .map((sense, index) => `${index + 1}. ${sense.definition}`)
                              .join("\n")}`
                          )
                          .join("\n\n")}`
                      )
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-teal-800 sm:self-auto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <rect x="8" y="8" width="12" height="12" rx="2" />
                      <path
                        d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                        strokeLinecap="round"
                      />
                    </svg>
                    {copied ? "Copied!" : "Copy definition"}
                  </button>
                </footer>
              </article>
            )}
          </div>
        </section>

        <p className="mt-5 px-3 text-center text-xs leading-5 text-slate-400">
          A simple space to discover words, understand meanings, and keep learning.
        </p>
      </div>
    </main>
  );
}

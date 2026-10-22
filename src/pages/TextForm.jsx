
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TextForm() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [replaceMessage, setReplaceMessage] = useState("");

  // Text statistics
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((sentence) => sentence.trim()).length
    : 0;
  const readingTime = Math.ceil(words / 200);

  // Update text
  const updateText = (newText) => {
    setText(newText);
    setCopied(false);
    setReplaceMessage("");
  };

  const handleChange = (event) => {
    updateText(event.target.value);
  };

  // Text transformations
  const handleUppercase = () => {
    updateText(text.toUpperCase());
  };

  const handleLowercase = () => {
    updateText(text.toLowerCase());
  };

  const handleTitleCase = () => {
    updateText(
      text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  const handleSentenceCase = () => {
    updateText(
      text.toLowerCase().replace(
        /(^\s*\w|[.!?]\s+\w)/g,
        (match) => match.toUpperCase()
      )
    );
  };

  const handleReverseCase = () => {
    updateText(
      [...text]
        .map((char) =>
          char === char.toUpperCase()
            ? char.toLowerCase()
            : char.toUpperCase()
        )
        .join("")
    );
  };

  // Text cleanup
  const handleRemoveSpaces = () => {
    updateText(text.trim().replace(/\s+/g, " "));
  };

  const handleRemoveBlankLines = () => {
    updateText(
      text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n")
    );
  };

  const handleClear = () => {
    updateText("");
    setFindText("");
    setReplaceText("");
  };

  // Copy text to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
      window.alert(
        "Unable to copy automatically. Please select and copy the text manually."
      );
    }
  };

  // Find and replace all matching text
  const handleReplace = () => {
    if (!findText) {
      setReplaceMessage("Enter the text you want to find.");
      return;
    }

    const escapedFindText = findText.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(escapedFindText, "gi");
    const matches = text.match(regex);

    if (!matches) {
      setReplaceMessage("No matching text found.");
      return;
    }

    updateText(text.replace(regex, () => replaceText));
    setReplaceMessage(`${matches.length} replacement(s) made.`);
  };

  // Download text as a .txt file
  const handleDownload = () => {
    const file = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "textora-document.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const buttonBase =
    "inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <main className="min-h-screen bg-[#F8FAF9] px-4 pb-12 pt-8 text-slate-800 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-6xl">

        {/* Welcome section */}
        <section className="mb-8 text-center sm:mb-10">
          <span className="mb-4 inline-flex rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-teal-800">
            YOUR EVERYDAY LANGUAGE TOOLKIT
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Make every word
            <span className="text-teal-700"> count.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Write, edit, and refine your text in one place. Translate
            languages or discover word meanings with your other tools.
          </p>
        </section>

        {/* Main editor */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Text workspace
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Type or paste your text below to get started.
              </p>
            </div>

            <span className="w-fit rounded-lg bg-[#DCEFEA] px-3 py-1.5 text-xs font-medium text-teal-800">
              {characters} characters
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <label
              htmlFor="myBox"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Your text
            </label>

            <textarea
              id="myBox"
              value={text}
              onChange={handleChange}
              placeholder="Start writing here, or paste your text..."
              rows={10}
              className="min-h-[240px] w-full resize-y rounded-xl border border-slate-200 bg-[#FCFDFD] p-4 text-base leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 sm:min-h-[300px] sm:p-5"
            />

            {/* Text editing buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" disabled={!text.length} onClick={handleUppercase} className={buttonBase}>
                Uppercase
              </button>

              <button type="button" disabled={!text.length} onClick={handleLowercase} className={buttonBase}>
                Lowercase
              </button>

              <button type="button" disabled={!text.length} onClick={handleTitleCase} className={buttonBase}>
                Title Case
              </button>

              <button type="button" disabled={!text.length} onClick={handleSentenceCase} className={buttonBase}>
                Sentence Case
              </button>

              <button type="button" disabled={!text.length} onClick={handleReverseCase} className={buttonBase}>
                Reverse Case
              </button>

              <button type="button" disabled={!text.length} onClick={handleRemoveSpaces} className={buttonBase}>
                Remove extra spaces
              </button>

              <button type="button" disabled={!text.length} onClick={handleRemoveBlankLines} className={buttonBase}>
                Remove blank lines
              </button>

              <button type="button" disabled={!text.length} onClick={handleCopy} className={buttonBase}>
                {copied ? "Copied!" : "Copy text"}
              </button>

              <button type="button" disabled={!text.length} onClick={handleDownload} className={buttonBase}>
                Download TXT
              </button>

              <button
                type="button"
                disabled={!text.length}
                onClick={handleClear}
                className="ml-auto inline-flex min-h-10 items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* Find and replace */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Find & Replace
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Find a word or phrase and replace every matching occurrence.
            Matching is case-insensitive.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="findText" className="mb-1.5 block text-sm font-medium text-slate-700">
                Find
              </label>
              <input
                id="findText"
                value={findText}
                onChange={(event) => {
                  setFindText(event.target.value);
                  setReplaceMessage("");
                }}
                placeholder="Word or phrase to find"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              />
            </div>

            <div>
              <label htmlFor="replaceText" className="mb-1.5 block text-sm font-medium text-slate-700">
                Replace with
              </label>
              <input
                id="replaceText"
                value={replaceText}
                onChange={(event) => {
                  setReplaceText(event.target.value);
                  setReplaceMessage("");
                }}
                placeholder="Replacement text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={!text.length}
              onClick={handleReplace}
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Replace all
            </button>

            {replaceMessage && (
              <p role="status" aria-live="polite" className="text-sm text-slate-600">
                {replaceMessage}
              </p>
            )}
          </div>
        </section>

        {/* Text statistics */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Your text summary
            </h2>
            <span className="text-xs text-slate-500">Updates as you type</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Words", value: words, note: "Total words" },
              { label: "Characters", value: characters, note: "Including spaces" },
              { label: "No spaces", value: charactersNoSpaces, note: "Characters only" },
              {
                label: "Reading time",
                value: words === 0 ? "0 min" : readingTime < 1 ? "< 1 min" : `${readingTime} min`,
                note: `${sentences} ${sentences === 1 ? "sentence" : "sentences"}`,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/40 sm:p-5">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links to other tools */}
        <section className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Explore your language tools
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Continue working with words, meanings, and languages.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Link
              to="/translator"
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md hover:shadow-teal-900/5 sm:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCEFEA] text-lg font-bold text-teal-800">
                A↔
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900">Text Translator</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  Translate text into another language with ease.
                </span>
                <span className="mt-3 inline-block text-sm font-semibold text-teal-700 group-hover:text-teal-900">
                  Translate text →
                </span>
              </span>
            </Link>

            <Link
              to="/dictionary"
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md hover:shadow-teal-900/5 sm:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCEFEA] text-lg font-bold text-teal-800">
                Aa
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900">Dictionary</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  Discover definitions, pronunciation, synonyms, and more.
                </span>
                <span className="mt-3 inline-block text-sm font-semibold text-teal-700 group-hover:text-teal-900">
                  Explore a word →
                </span>
              </span>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

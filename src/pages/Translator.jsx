 

import React, { useState } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";

export default function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("");
  const [translateTo, setTranslateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Your countries object uses language codes as keys
  // and language names as values.
  const languages = Object.entries(countries)
    .map(([code, originalName]) => {
      let name = originalName;

      if (code === "ur-PK") name = "Urdu";
      if (code === "pa-IN") name = "Punjabi";
      if (code === "bn-IN") name = "Bengali";
      if (code === "fa-IR") name = "Persian";
      if (code === "dv-MV") name = "Dhivehi";
      if (code === "bjs-BB") name = "Bajan Creole";
      if (code === "en-GB") name = "English";

      return { code, name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleTranslate = async () => {
    setError("");
    setCopied(false);

    if (!fromText.trim()) {
      setError("Please enter or paste your text first.");
      return;
    }

    if (!translateFrom || !translateTo) {
      setError("Please select both languages before translating.");
      return;
    }

    if (translateFrom === translateTo) {
      setError("Please select two different languages.");
      return;
    }

    setLoading(true);
    setToText("");

    try {
      const params = new URLSearchParams({
        q: fromText.trim(),
        langpair: `${translateFrom}|${translateTo}`,
      });

      const response = await fetch(
        `https://api.mymemory.translated.net/get?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          "The translation service is unavailable. Please try again."
        );
      }

      const data = await response.json();

      if (
        Number(data.responseStatus) !== 200 ||
        !data.responseData?.translatedText
      ) {
        throw new Error(
          data.responseDetails ||
            "Translation failed. Please try another language pair."
        );
      }

      setToText(data.responseData.translatedText);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    if (!translateFrom || !translateTo) return;

    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);
    setFromText(toText);
    setToText(fromText);
    setError("");
    setCopied(false);
  };

  const handleClear = () => {
    setFromText("");
    setToText("");
    setTranslateFrom("");
    setTranslateTo("");
    setError("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!toText) return;

    try {
      await navigator.clipboard.writeText(toText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy text. Please copy it manually.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAF9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <header className="mb-9 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            Free online translator
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Translate your text
            <span className="mt-1 block text-teal-700">
              into another language
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Paste your text, choose the original and target
            languages, and translate in seconds.
          </p>
        </header>

        {/* Translator workspace */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="font-semibold text-slate-900">
                Text translator
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose your languages below to get started.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="self-start rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:self-auto"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Original text */}
            <div className="min-w-0 p-5 sm:p-7">
              <label
                htmlFor="translate-from"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Translate from
              </label>

              <select
                id="translate-from"
                value={translateFrom}
                onChange={(event) => {
                  setTranslateFrom(event.target.value);
                  setToText("");
                  setError("");
                }}
                className="mb-5 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              >
                <option value="">Choose the language of your text</option>
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>

              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="source-text"
                  className="text-sm font-semibold text-slate-800"
                >
                  Your text
                </label>
                <span className="text-xs tabular-nums text-slate-400">
                  {fromText.length}/5000
                </span>
              </div>

              <textarea
                id="source-text"
                value={fromText}
                onChange={(event) => {
                  setFromText(event.target.value);
                  setToText("");
                  setError("");
                  setCopied(false);
                }}
                maxLength={5000}
                placeholder="Type or paste your text here..."
                className="min-h-[260px] w-full resize-y rounded-xl border border-slate-200 bg-[#FCFDFD] p-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                {fromText.trim()
                  ? `${fromText.trim().split(/\s+/).length} words`
                  : "Enter the text you want to translate."}
              </p>
            </div>

            {/* Target language and translated text */}
            <div className="min-w-0 border-t border-slate-100 p-5 sm:p-7 lg:border-l lg:border-t-0">
              <label
                htmlFor="translate-to"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Translate to
              </label>

              <select
                id="translate-to"
                value={translateTo}
                onChange={(event) => {
                  setTranslateTo(event.target.value);
                  setToText("");
                  setError("");
                }}
                className="mb-5 w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              >
                <option value="">Choose the language you want</option>
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
              </select>

              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="translated-text"
                  className="text-sm font-semibold text-slate-800"
                >
                  Translated text
                </label>

                {toText && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-lg px-2 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-50"
                  >
                    {copied ? "Copied!" : "Copy text"}
                  </button>
                )}
              </div>

              <textarea
                id="translated-text"
                value={toText}
                readOnly
                placeholder="Your translation will appear here..."
                className="min-h-[260px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400"
              />

              <p className="mt-2 text-xs text-slate-400">
                {toText
                  ? `${toText.length} characters`
                  : "Your translated result will appear here."}
              </p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mx-5 mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-7"
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col items-center gap-3 border-t border-slate-100 bg-[#FCFDFD] px-5 py-5 sm:px-7">
            <button
              type="button"
              onClick={handleTranslate}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-56"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
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
                  Translating...
                </>
              ) : (
                "Translate"
              )}
            </button>

            <p className="text-center text-xs leading-5 text-slate-400">
              Free translation powered by MyMemory. Usage limits and
              language availability may apply.
            </p>
          </div>
        </section>

        {/* Other Textora tools */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-200 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <span className="text-xl" aria-hidden="true">✎</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Text Editor</h3>
              <p className="mt-1 text-sm text-slate-500">
                Format and clean your text.
              </p>
            </div>
            <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-700">
              →
            </span>
          </Link>

          <Link
            to="/dictionary"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-200 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <span className="text-xl" aria-hidden="true">▤</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Dictionary</h3>
              <p className="mt-1 text-sm text-slate-500">
                Find meanings and definitions.
              </p>
            </div>
            <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-teal-700">
              →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}

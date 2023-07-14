import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  const [text, setText] = useState("");

  return (
    <>
      <div className="container mt-16">
        <h1 className="text-2xl text-center mb-4">Text Editor</h1>
        <div className="mb-3 md:w-[1000px] md:mx-auto">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <div className="flex flex-col items-center mt-4 md:flex-row md:justify-center">
          <button
            disabled={text.length === 0}
            className="btn bg-blue-700 text-white hover:bg-gray-300 hover:text-black mx-1 my-1"
            onClick={handleUpClick}
          >
            Convert to Uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn bg-blue-700 text-white hover:bg-gray-300 hover:text-black mx-1 my-1"
            onClick={handleLoClick}
          >
            Convert to Lowercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn bg-blue-700 text-white hover:bg-gray-300 hover:text-black mx-1 my-1"
            onClick={handleExtraSpaces}
          >
            Remove Extra Spaces
          </button>
          <button
            disabled={text.length === 0}
            className="btn bg-blue-700 text-white hover:bg-gray-300 hover:text-black mx-1 my-1"
            onClick={handleCopy}
          >
            Copy Text
          </button>
          <button
            disabled={text.length === 0}
            className="btn bg-blue-700 text-white hover:bg-gray-300 hover:text-black mx-1 my-1"
            onClick={handleClearClick}
          >
            Clear Text
          </button>
        </div>
      </div>
      <div className="container my-3 mx-auto">
        <h2 className="">Your text summary</h2>
        <p>
          words:{" "}
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words <br /> characters: {text.length} characters
        </p>
        <p>
          Read Time:
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
      </div>
    </>
  );
}

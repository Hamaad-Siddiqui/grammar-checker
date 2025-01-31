"use client";

import { useState } from "react";
import { LoadingSpinner } from "./components/loadingSpinner";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedText, setCheckedText] = useState("");

  const handleCheck = async () => {
    try {
      setLoading(true);
      setCheckedText("");
      const response = await fetch("/api/check-grammar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to check grammar");
      }

      const data = await response.json();
      setCheckedText(data.checkedText);
      setLoading(false);
    } catch (error) {
      console.error("Error checking grammar:", error);
    }
  };

  const parseText = (inputText) =>
    inputText.split(/(<misspelled>.*?<\/misspelled>)/g).map((part, index) => {
      const match = part.match(/<misspelled>(.*?)<\/misspelled>/);
      return match ? (
        <span key={index} className="text-red-500">
          {match[1]}
        </span>
      ) : (
        part
      );
    });

  return (
    <div className="flex flex-col justify-center mt-10 w-full max-w-xl mx-auto px-5">
      <h1 className="text-2xl mb-2 font-semibold">Grammar Checker</h1>
      <p className="mb-5 text-gray-500">
        Enter your text in the field so our AI can check it for grammatical
        issues:
      </p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mb-4 border rounded border-gray-600 h-32"
        placeholder="Enter your text here"
      />
      <button
        onClick={handleCheck}
        className="w-full p-2 cursor-pointer bg-black text-white rounded font-medium"
      >
        {loading ? <LoadingSpinner className="mx-auto" /> : "Check Sentence"}
      </button>
      <p className="mt-10 mb-3 font-semibold text-gray-800">
        Checked text will appear here:
      </p>
      <div className="p-2 border rounded h-32 bg-gray-50 border-gray-300">
        {parseText(checkedText)}
      </div>
    </div>
  );
}

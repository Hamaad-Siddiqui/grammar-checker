"use client";

export default function Home() {
  return (
    <div className="flex flex-col justify-center mt-10 w-full max-w-xl mx-auto">
      <h1 className="text-2xl mb-2 font-semibold">Grammar Checker</h1>
      <p className="mb-5 text-gray-500">
        Enter your text in the field so our AI can check it for grammatical
        issues:
      </p>
      <textarea
        className="w-full p-2 mb-4 border rounded border-gray-600 h-32"
        placeholder="Enter your text here"
      />
      <button className="w-full p-2 cursor-pointer bg-black text-white rounded font-medium">
        Check Sentence
      </button>
      <p className="mt-10 mb-3 font-semibold text-gray-800">
        Checked text will appear here:
      </p>
      <textarea
        readOnly
        disabled
        className="w-full p-2 border rounded h-32 bg-gray-50 border-gray-300"
      />
    </div>
  );
}

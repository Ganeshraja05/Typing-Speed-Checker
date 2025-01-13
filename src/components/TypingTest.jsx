import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import ProgressBar from "./ProgressBar"; // Custom ProgressBar component
import useInterval from "../hooks/useInterval"; // Custom useInterval hook

const TypingTest = () => {
  const initialDuration = 60;

  const referenceTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "I think, therefore I am.",
  ];

  const [selectedText, setSelectedText] = useState(referenceTexts[0]);
  const [customDuration, setCustomDuration] = useState(initialDuration);
  const [remainingTime, setRemainingTime] = useState(initialDuration);
  const [input, setInput] = useState("");
  const [isTestActive, setIsTestActive] = useState(false);
  const [resultsHistory, setResultsHistory] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [grammarFeedback, setGrammarFeedback] = useState("");

  const GRAMMAR_API_URL = "https://grammer-checker1.p.rapidapi.com/v1/grammer-checker";
  const GRAMMAR_API_KEY = "07ab971dc4msh4bad6264e6c1299p111dacjsne9c6a250a3d5";

  // Interval logic using custom useInterval hook
  useInterval(
    () => {
      setRemainingTime((time) => time - 1);
    },
    isTestActive ? 1000 : null
  );

  useEffect(() => {
    if (remainingTime === 0 && isTestActive) {
      stopTest();
    }
  }, [remainingTime, isTestActive]);

  const startTest = () => {
    setIsTestActive(true);
    setRemainingTime(customDuration);
    setInput("");
  };

  const stopTest = () => {
    setIsTestActive(false);
    calculateResults();
  };

  const resetTest = () => {
    setIsTestActive(false);
    setRemainingTime(customDuration);
    setInput("");
    setWpm(0);
    setAccuracy(100);
    setGrammarFeedback("");
  };

  const calculateResults = () => {
    const words = input.trim().split(/\s+/).length;
    const correctChars = selectedText
      .slice(0, input.length)
      .split("")
      .filter((char, i) => char === input[i]).length;
    const accuracy = ((correctChars / input.length) * 100) || 0;

    setWpm(Math.round((words / customDuration) * 60));
    setAccuracy(Math.round(accuracy));

    const result = {
      wpm: Math.round((words / customDuration) * 60),
      accuracy: Math.round(accuracy),
      date: new Date().toLocaleString(),
    };

    setResultsHistory([result, ...resultsHistory]);
  };

  const checkGrammar = async () => {
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": GRAMMAR_API_KEY,
        "x-rapidapi-host": "grammer-checker1.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ text: input }),
    };

    try {
      const response = await axios(GRAMMAR_API_URL, options);
      const result = response.data;

      if (result && result.errors && result.errors.length > 0) {
        const feedback = result.errors.map((error, index) => {
          return `${index + 1}. ${error.error}: ${error.sentence}`;
        });
        setGrammarFeedback(feedback.join("\n"));
      } else {
        setGrammarFeedback("No grammar or spelling mistakes found!");
      }
    } catch (error) {
      console.error("Error checking grammar:", error.message);
      setGrammarFeedback("An error occurred while checking grammar.");
    }
  };

  const progress = ((customDuration - remainingTime) / customDuration) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Typing Speed Test
      </h2>

      {/* Text Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">
          Select Reference Text:
        </label>
        <select
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          disabled={isTestActive}
        >
          {referenceTexts.map((text, index) => (
            <option key={index} value={text}>
              {text}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">
          Select Test Duration:
        </label>
        <select
          value={customDuration}
          onChange={(e) => setCustomDuration(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          disabled={isTestActive}
        >
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
        </select>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={startTest}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {isTestActive ? "Restart Test" : "Start Test"}
        </button>
        <button
          onClick={stopTest}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          disabled={!isTestActive}
        >
          Stop Test
        </button>
        <button
          onClick={resetTest}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Reset Test
        </button>
        <p className="text-gray-700">
          Time Remaining: <span className="font-bold">{remainingTime}s</span>
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Reference Text Display */}
      <div className="border p-4 rounded-md bg-gray-100 text-lg mb-6 leading-7">
        {selectedText}
      </div>

      {/* Typing Input */}
      <textarea
        className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        rows="3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!isTestActive}
        placeholder="Start typing here..."
      ></textarea>

      {/* Grammar Check */}
      <button
        onClick={checkGrammar}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Check Grammar and Spelling
      </button>

      {/* Grammar Feedback */}
      {grammarFeedback && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 text-gray-700">
          <h4 className="font-bold mb-2">Grammar Feedback:</h4>
          <pre>{grammarFeedback}</pre>
        </div>
      )}

      {/* Results */}
      <Results wpm={wpm} accuracy={accuracy} />

      {/* Results History */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Results History</h3>
        {resultsHistory.length === 0 ? (
          <p className="text-gray-600">No results saved yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">WPM</th>
                <th className="border border-gray-300 px-4 py-2">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {resultsHistory.map((result, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {result.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{result.wpm}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {result.accuracy}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TypingTest;

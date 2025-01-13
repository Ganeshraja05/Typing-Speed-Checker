import { useState, useEffect } from "react";

const useTypingTest = (referenceText, initialTestDuration = 60) => {
  const [testDuration, setTestDuration] = useState(initialTestDuration);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(testDuration);
  const [isTestActive, setIsTestActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // Handle user input
  const handleInputChange = (e) => {
    if (!isTestActive) return;

    const value = e.target.value;

    if (startTime === null) {
      setStartTime(Date.now()); // Record start time on first keystroke
    }

    setInput(value);
  };

  // Start the test
  const startTest = () => {
    setInput("");
    setStartTime(null);
    setRemainingTime(testDuration);
    setIsTestActive(true);
    setWpm(0);
    setAccuracy(0);
  };

  // End the test
  const endTest = () => {
    setIsTestActive(false);
  };

  // Reset the test
  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setRemainingTime(testDuration);
    setIsTestActive(false);
    setWpm(0);
    setAccuracy(0);
  };

  // Update timer
  useEffect(() => {
    if (!isTestActive || remainingTime <= 0) {
      endTest();
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, remainingTime]);

  // Calculate WPM and accuracy whenever input changes
  useEffect(() => {
    if (input.length === 0 || !isTestActive) {
      setWpm(0);
      setAccuracy(0);
      return;
    }

    const wordsTyped = input.trim().split(" ").length;
    const elapsedTimeMinutes = (Date.now() - startTime) / 60000;

    // Calculate WPM
    const calculatedWpm = Math.floor(wordsTyped / elapsedTimeMinutes);
    setWpm(calculatedWpm);

    // Calculate accuracy
    const correctChars = referenceText
      .slice(0, input.length)
      .split("")
      .filter((char, index) => char === input[index]).length;

    const calculatedAccuracy = Math.floor(
      (correctChars / input.length) * 100
    );
    setAccuracy(calculatedAccuracy);
  }, [input, startTime, referenceText, isTestActive]);

  // Highlight text comparison
  const getHighlightedText = () => {
    return referenceText.split("").map((char, index) => {
      const isCorrect = input[index] === char;
      const isTyped = index < input.length;

      return {
        char,
        isCorrect,
        isTyped,
      };
    });
  };

  return {
    input,
    handleInputChange,
    getHighlightedText,
    wpm,
    accuracy,
    remainingTime,
    isTestActive,
    startTest,
    resetTest,
    setTestDuration, // New function to set custom duration
  };
};

export default useTypingTest;

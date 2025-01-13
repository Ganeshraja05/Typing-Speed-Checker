import { useEffect, useRef } from "react";

/**
 * A custom hook to set up an interval in a React functional component.
 * @param {Function} callback - The function to be called at each interval.
 * @param {number|null} delay - The delay in milliseconds. If `null`, the interval is paused.
 */
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return; // Don't create an interval if the delay is null.
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, delay);

    return () => clearInterval(id); // Cleanup on unmount or delay change.
  }, [delay]);
};

export default useInterval;

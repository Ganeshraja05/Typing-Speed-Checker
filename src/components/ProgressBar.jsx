import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress, color, height }) => {
  return (
    <div
      className="w-full bg-gray-200 rounded-full mb-4"
      style={{ height: height || "1rem" }}
    >
      <div
        className="rounded-full transition-all"
        style={{
          width: `${Math.min(Math.max(progress, 0), 100)}%`,
          backgroundColor: color || "#3b82f6", // Default to blue-500 if color not provided
          height: "100%",
        }}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired, // Progress should be a number between 0 and 100
  color: PropTypes.string, // Optional: Color of the progress bar
  height: PropTypes.string, // Optional: Height of the progress bar (e.g., "1rem", "10px")
};

ProgressBar.defaultProps = {
  color: "#3b82f6", // Default blue-500 color
  height: "1rem", // Default height
};

export default ProgressBar;

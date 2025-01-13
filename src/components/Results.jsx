const Results = ({ wpm, accuracy }) => (
    <div className="p-4 mt-4 border rounded-md bg-gray-50">
      <h2 className="text-xl font-bold">Results</h2>
      <p className="text-lg">
        <span className="font-bold">WPM:</span> {wpm}
      </p>
      <p className="text-lg">
        <span className="font-bold">Accuracy:</span> {accuracy}%
      </p>
    </div>
  );
  
  export default Results;
  
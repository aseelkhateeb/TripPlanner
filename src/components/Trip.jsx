import React from "react";

export default function Trip({ doStuff, input, setInput, result }) {
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter City name"
          onChange={(e) => setInput(e.target.value)}
        />
        <button>
          <img src="/Images/search.png" onClick={doStuff} alt="" />
        </button>
      </div>
      {/* {result && <h3 className="intro">Here is our plan to {input}:</h3>} */}
      {result && (
        <pre className="result-text">{result.length > 0 ? result : ""}</pre>
      )}
    </div>
  );
}

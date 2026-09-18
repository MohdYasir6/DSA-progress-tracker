import { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [problems, setProblems] = useState([]);
  const isFirstLoad = useRef(true);
  const [name, setName] = useState("");
  const [pattern, setPattern] = useState("Array");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dateSolved, setDateSolved] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filterPattern, setFilterPattern] = useState("All");
  const [customPattern, setCustomPattern] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("problems");
    if (saved) {
      setProblems(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false; // pehli baar hai, isliye save MAT karo, bas flag change karo
      return;
    }
    localStorage.setItem("problems", JSON.stringify(problems));
  }, [problems]);
  function handleAddButton(e) {
    e.preventDefault();

    if (name.trim() === "") {
      alert("enter your problem name");
      return;
    }
    if (dateSolved === "") {
      alert("enter the date solved");
      return;
    }
    const newProblem = {
      id: Date.now(),
      name: name,
      pattern: finalPattern,
      difficulty: difficulty,
      dateSolved: dateSolved,
      lastRevised: dateSolved,
    };

    setProblems([...problems, newProblem]);
    setName("");
    setDateSolved(new Date().toISOString().split("T")[0]);
  }
  function handleDelete(id) {
    setProblems(problems.filter((p) => p.id !== id));
  }
  function getDaysSince(dateSolved) {
    const solved = new Date(dateSolved); // dateSolved is in inout string
    const today = new Date();
    const diffInMs = today - solved;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  function getDueForRivision() {
    return problems.filter((p) => {
      const days = getDaysSince(p.lastRevised);
      return days === 1 || days === 3 || days === 7;
    });
  }
  function handleMarkRevised(id) {
    const today = new Date().toISOString().split("T")[0];
    setProblems(
      problems.map((p) => (p.id === id ? { ...p, lastRevised: today } : p)),
    );
  }
  const finalPattern = pattern === "Other" ? customPattern : pattern;
  const filteredProblems =
    filterPattern === "All"
      ? problems
      : problems.filter((p) => p.pattern === filterPattern);
  const uniquePatterns = [...new Set(problems.map((p) => p.pattern))];
  return (
    <div>
      <form onSubmit={handleAddButton}>
        <input // input name ke liye
          type="text"
          placeholder="Enter Problem Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <select value={pattern} onChange={(e) => setPattern(e.target.value)}>
          <option value="Array">Array</option>
          <option value="Two Pointer">Two Pointer</option>
          <option value="Recursion">Recursion</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Mid">Mid</option>
          <option value="Mid-Hard">Mid-Hard</option>
          <option value="Hard">Hard</option>
        </select>

        <input // input date submitted ke liye kab solve kiya
          type="date"
          value={dateSolved}
          onChange={(e) => setDateSolved(e.target.value)}
        ></input>

        <button type="submit">Add</button>
        {pattern === "Other" && (
          <input
            type="text"
            placeholder="Enter new pattern name"
            value={customPattern}
            onChange={(e) => setCustomPattern(e.target.value)}
          />
        )}
      </form>
      <select
        value={filterPattern}
        onChange={(e) => setFilterPattern(e.target.value)}
      >
        <option value="All">All</option>
        {uniquePatterns.map((pat) => (
          <option key={pat} value={pat}>
            {pat}
          </option>
        ))}
      </select>

      {filteredProblems.map((p) => (
        <div key={p.id}>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
          <p>{p.name}</p>
          <p>
            {p.pattern}-{p.difficulty}
          </p>
          <p>{p.dateSolved}</p>
        </div>
      ))}
      {getDueForRivision().length > 0 && (
        <div>
          <h3>Due For Rivision Today</h3>
          {getDueForRivision().map((p) => (
            <div key={p.id}>
              <p>{p.name}</p>
              <p>
                Solved: {p.dateSolved} ({getDaysSince(p.lastRevised)} days ago)
              </p>
              <button onClick={() => handleMarkRevised(p.id)}>
                Mark as Revised
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

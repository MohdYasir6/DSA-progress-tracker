import { useState } from "react";

import "./App.css";

function App() {
  const [problems, setProblems] = useState([]);

  const [name, setName] = useState("");
  const [pattern, setPattern] = useState("Array");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dateSolved, setDateSolved] = useState("");

  function handleAddButton(e) {
    e.preventDefault();
    const newProblem = {
      id: Date.now(),
      name: name,
      pattern: pattern,
      difficulty: difficulty,
      dateSolved: dateSolved,
    };

    setProblems([...problems, newProblem]);
  }
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
      </form>
      {problems.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
          <p>
            {p.pattern}-{p.difficulty}
          </p>
          <p>{p.dateSolved}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

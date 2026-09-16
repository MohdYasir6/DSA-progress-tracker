import { useState } from "react";

import "./App.css";

function App() {
  const [problems, setProblems] = useState([]);

  const [name, setName] = useState("");
  const [pattern, setPattern] = useState("Array");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dateSolved, setDateSolved] = useState("");
  return (
    <div>
      <form></form>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./components/ThemeToggle";
import ProblemItem from "./components/ProblemItem";
import "./App.css";
import ReviseBox from "./components/ReviseBox";
import AddProblemForm from "./components/AddProblemForm";
import FilterDropdown from "./components/FilterDropdown";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";

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
  const { theme } = useContext(ThemeContext);

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
    <div className={theme}>
      <ThemeToggle />
      <AddProblemForm
        name={name}
        setName={setName}
        pattern={pattern}
        setPattern={setPattern}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        dateSolved={dateSolved}
        setDateSolved={setDateSolved}
        customPattern={customPattern}
        setCustomPattern={setCustomPattern}
        onSubmit={handleAddButton}
      />
      <ReviseBox
        dueProblems={getDueForRivision()}
        getDaysSince={getDaysSince}
        onMarkRevised={handleMarkRevised}
      />
      <FilterDropdown
        filterPattern={filterPattern}
        setFilterPattern={setFilterPattern}
        uniquePatterns={uniquePatterns}
      />

      {filteredProblems.map((p) => (
        <ProblemItem key={p.id} problem={p} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;

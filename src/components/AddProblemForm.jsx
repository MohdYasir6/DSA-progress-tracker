import "./AddProblemForm.css";

function AddProblemForm({
  name,
  setName,
  pattern,
  setPattern,
  difficulty,
  setDifficulty,
  dateSolved,
  setDateSolved,
  customPattern,
  setCustomPattern,
  onSubmit,
}) {
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Enter Problem Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="form-select"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      >
        <option value="Array">Array</option>
        <option value="Two Pointer">Two Pointer</option>
        <option value="Recursion">Recursion</option>
        <option value="Other">Other</option>
      </select>
      <select
        className="form-select"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="Easy">Easy</option>
        <option value="Mid">Mid</option>
        <option value="Mid-Hard">Mid-Hard</option>
        <option value="Hard">Hard</option>
      </select>
      <input
        className="form-input"
        type="date"
        value={dateSolved}
        onChange={(e) => setDateSolved(e.target.value)}
      />
      <button className="form-submit-btn" type="submit">
        Add
      </button>
      {pattern === "Other" && (
        <input
          className="form-input"
          type="text"
          placeholder="Enter new pattern name"
          value={customPattern}
          onChange={(e) => setCustomPattern(e.target.value)}
        />
      )}
    </form>
  );
}

export default AddProblemForm;

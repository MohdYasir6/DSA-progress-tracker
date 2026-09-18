import "./ProblemItem.css";

function ProblemItem({ problem, onDelete }) {
  return (
    <div className="problem-item">
      <div className="problem-info">
        <p className="problem-name">{problem.name}</p>
        <p className="problem-meta">
          {problem.pattern} - {problem.difficulty}
        </p>
        <p className="problem-date">{problem.dateSolved}</p>
      </div>
      <button className="delete-btn" onClick={() => onDelete(problem.id)}>
        Delete
      </button>
    </div>
  );
}

export default ProblemItem;

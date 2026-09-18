function ProblemItem({ problem, onDelete }) {
  return (
    <div>
      <button onClick={() => onDelete(problem.id)}>Delete</button>
      <p>{problem.name}</p>
      <p>
        {problem.pattern}-{problem.difficulty}
      </p>
      <p>{problem.dateSolved}</p>
    </div>
  );
}

export default ProblemItem;

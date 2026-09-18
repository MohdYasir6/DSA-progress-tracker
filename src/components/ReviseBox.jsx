function ReviseBox({ dueProblems, getDaysSince, onMarkRevised }) {
  return (
    <div>
      {dueProblems.length > 0 && (
        <div>
          <h3>Due For Rivision Today</h3>
          {dueProblems.map((p) => (
            <div key={p.id}>
              <p>{p.name}</p>
              <p>
                Solved: {p.dateSolved} ({getDaysSince(p.lastRevised)} days ago)
              </p>
              <button onClick={() => onMarkRevised(p.id)}>
                Mark as Revised
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ReviseBox;

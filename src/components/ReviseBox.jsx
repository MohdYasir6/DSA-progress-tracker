import "./ReviseBox.css";

function ReviseBox({ dueProblems, getDaysSince, onMarkRevised }) {
  if (dueProblems.length === 0) return null;

  return (
    <div className="revise-box">
      <h3 className="revise-title">⚠ Due For Revision Today</h3>
      {dueProblems.map((p) => (
        <div key={p.id} className="revise-item">
          <div className="revise-info">
            <p className="revise-name">{p.name}</p>
            <p className="revise-meta">
              Solved: {p.dateSolved} ({getDaysSince(p.lastRevised)} days ago)
            </p>
          </div>
          <button className="revise-btn" onClick={() => onMarkRevised(p.id)}>
            Mark as Revised
          </button>
        </div>
      ))}
    </div>
  );
}

export default ReviseBox;

import "./StatsBar.css";

function StatsBar({ totalProblems, easyCount, midCount, hardCount }) {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <p className="stat-number">{totalProblems}</p>
        <p className="stat-label">Total</p>
      </div>
      <div className="stat-item">
        <p className="stat-number">{easyCount}</p>
        <p className="stat-label">Easy</p>
      </div>
      <div className="stat-item">
        <p className="stat-number">{midCount}</p>
        <p className="stat-label">Mid</p>
      </div>
      <div className="stat-item">
        <p className="stat-number">{hardCount}</p>
        <p className="stat-label">Hard</p>
      </div>
    </div>
  );
}

export default StatsBar;

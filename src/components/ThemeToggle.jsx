import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-wrapper">
      <span className="theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
      <label className="theme-switch">
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default ThemeToggle;

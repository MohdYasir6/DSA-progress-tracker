import { createContext, useState } from "react";
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
/*
========================================================
DARK MODE (useContext) — KAISE KAAM KARTA HAI (SUMMARY)
========================================================

3 LAYERS MEIN SAMAJHO:

LAYER 1: ThemeContext.jsx — "Data ki Factory"
------------------------------------------------
- Yahan `theme` state bani hai (useState se) - "dark" ya "light"
- `toggleTheme()` function bana hai - theme ko switch karta hai
- `ThemeContext.Provider` in dono ko ek package
  (value={{ theme, toggleTheme }}) mein daal ke,
  apne andar ke saare children ko available karwata hai

LAYER 2: main.jsx — "Poore App ko Wrap Karna"
------------------------------------------------
  <ThemeProvider>
    <App />
  </ThemeProvider>

- App (aur uske andar ke SAARE components, chahe kitne
  bhi deep ho) ab ThemeProvider ke "range" mein aa gaye
- Matlab: koi bhi component ab theme data access kar sakta hai
  bina props se manually pass kiye (prop drilling avoid hui)

LAYER 3: Jaha bhi data USE karna hai (ThemeToggle.jsx, App.jsx)
------------------------------------------------
  const { theme, toggleTheme } = useContext(ThemeContext);

- Ye "WiFi se connect hona" jaisa hai - Layer 1 mein jo
  Provider ne data banaya tha, wahi yahan nikal rahe hain
- ThemeToggle.jsx mein: theme (switch ka color/position) +
  toggleTheme (button dabane pe call hota hai)
- App.jsx mein: sirf theme chahiye, root div ko
  className={theme} de dete hain ("dark" ya "light" label)


CSS WALA PART — Colors Automatically Badalna
------------------------------------------------
.dark  { --bg-color: #0d0d0d;  --card-bg: #241111; ... }
.light { --bg-color: #eef2f7;  --card-bg: #fafbfc; ... }

- App.jsx ka root div jab className="dark" hota hai,
  browser .dark wale CSS variables use karta hai
- Jab className="light" hota hai, .light wale use hote hain
- Baaki saari component CSS files (ProblemItem.css, etc.)
  mein hardcoded color ki jagah var(--card-bg) jaisa likha -
  ye automatically sahi color utha leta hai, parent div ki
  class (dark/light) ke hisaab se


POORA FLOW — EK CLICK KA SAFAR
------------------------------------------------
1. User switch pe click karta hai
2. onClick trigger karta hai toggleTheme()      [ThemeToggle.jsx]
3. toggleTheme() function chalta hai             [ThemeContext.jsx - yahi bana tha]
4. setTheme() call hota hai - "dark" se "light" (ya vice versa) ban jaata hai
5. Provider ke andar ke saare components ko NAYA
   theme value mil jaata hai automatically (React re-render)
6. App.jsx mein className={theme} update ho jaata hai
7. CSS naya class dekhta hai, .light (ya .dark) ke
   variables activate hote hain
8. Poore page ke colors badal jaate hain (kyunki sab
   var(--...) use kar rahe the, hardcoded color nahi)


ONE-LINE SUMMARY
------------------------------------------------
ThemeContext.jsx mein data banaya -> main.jsx mein poore
app ko available karaya -> jaha zarurat thi wahan useContext
se nikaal ke use kiya -> CSS variables se colors automatically
badal gaye.

========================================================
*/
//<ThemeContext.Provider> ek special component hai jo batata hai: "jo bhi iske andar (children) hai, unko ye data available karwao."value={ { theme: theme, toggleTheme: toggleTheme } }{ theme, toggleTheme }
// Ye same hai:
// { theme: theme, toggleTheme: toggleTheme }

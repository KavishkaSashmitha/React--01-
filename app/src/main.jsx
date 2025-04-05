import { StrictMode, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "./components/ui/provider.jsx";
import { ThemeContext } from './ThemeContext'; // ✅ Import your context

function ThemeComponent() {
  const { theme } = useContext(ThemeContext);
  return <div>Current Theme is : {theme}</div>;
}

function AppWrapper() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeComponent />
      <App />
    </ThemeContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <AppWrapper />
    </Provider>
  </StrictMode>,
);
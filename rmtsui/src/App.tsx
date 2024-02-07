import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <h1>NavBar</h1>
    </div>
  );
};

export default App;

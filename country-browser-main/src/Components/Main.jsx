import React, { useState } from 'react'
import Header from "./Header"
import ThemeContext from "../Context/Theme"
const Main = () => {
  const [theme, setTheme] = useState("blue");
  function changeColor() {
    setTheme((prevTheme) => {
      return prevTheme === "blue" ? "yellow" : "blue";
    });
  }
  return (
    <div>
      <ThemeContext.Provider value={{color:theme}}>
        <Header action={changeColor} />
      </ThemeContext.Provider>
    </div>
  )
}

export default Main

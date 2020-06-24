import React, { useState, useEffect } from "react";
import { intervalToDuration, isBefore } from "date-fns";

import "./App.css";

import DisplayDate from "./displayDate";

function App() {
  const [inputDate, setInputDate] = useState("");

  const handleChangeInputDate = (e) => {
    setInputDate(`${e.target.value}T00:00:00`);
  };

  return (
    <div className="App">
      <input id="inputDate" type="date" onChange={handleChangeInputDate} />
      {inputDate}
      <DisplayDate date={inputDate !== "" ? inputDate : undefined} />
    </div>
  );
}

export default App;

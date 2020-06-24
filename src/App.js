import React, { useState } from "react";
import Card from "./components/Card";
import { isValid } from "date-fns";

import "./App.css";

import DisplayDate from "./components/DisplayTime";

function App() {
  const [inputDate, setInputDate] = useState("");

  const handleChangeInputDate = (e) => {
    setInputDate(`${e.target.value}T00:00:00`);
  };

  return (
    <div className="App">
      <Card>
        <div className="content-app">
          <input
            id="inputDate"
            type="date"
            placeholder="DD / MM / YYYY"
            onChange={handleChangeInputDate}
          />

          <DisplayDate
            date={
              inputDate !== "" && isValid(new Date(inputDate))
                ? inputDate
                : undefined
            }
          />
        </div>
      </Card>
    </div>
  );
}

export default App;

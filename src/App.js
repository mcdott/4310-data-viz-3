import "./App.css";
import BubbleChart from "./BubbleChart";
import { useState, useEffect } from "react";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.json("./data2.json").then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <BubbleChart data={data} />
      </header>
    </div>
  );
}

export default App;

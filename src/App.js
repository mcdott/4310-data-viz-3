import "./App.css";
import BubbleChart from "./BubbleChart";
import BubbleChartSpeed from "./BubbleChartSpeed";
import FacetedScatterChart from "./FacetedScatterChart";
import ScatterChart from "./ScatterChart";
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
        <BubbleChartSpeed data={data} />
        <FacetedScatterChart data={data} />
        <ScatterChart data={data} />
      </header>
    </div>
  );
}

export default App;

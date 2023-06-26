import "./App.css";
import BubbleChart from "./BubbleChart";
import BubbleChartSpeed from "./BubbleChartSpeed";
import FacetedScatterChart from "./FacetedScatterChart";
import ScatterChart from "./ScatterChart";
import EyeTrackingSketch from "./EyeTrackingSketch";
import { useState, useEffect } from "react";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([]);
  const [isSketchVisible, setIsSketchVisible] = useState(false);

  useEffect(() => {
    d3.json("./data2.json").then((data) => {
      setData(data);
    });
  }, []);

  const handleToggle = () => {
    setIsSketchVisible(!isSketchVisible);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={handleToggle}>
          {isSketchVisible ? "Show charts" : "Show sketch"}
        </button>
        {isSketchVisible ? (
          <EyeTrackingSketch />
        ) : (
          <>
            <BubbleChart data={data} />
            <BubbleChartSpeed data={data} />
            <FacetedScatterChart data={data} />
            <ScatterChart data={data} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;

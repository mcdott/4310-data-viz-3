import "./App.css";
import BubbleChart from "./BubbleChart";
import FacetedScatterChart from "./FacetedScatterChart";
import ScatterChart from "./ScatterChart";
import EyeTrackingSketch from "./EyeTrackingSketch";
import { useState, useEffect } from "react";
import * as d3 from "d3";

function App() {
  const [data, setData] = useState([]);
  const [isSketchVisible, setIsSketchVisible] = useState(false);

  useEffect(() => {
    d3.json("./data.json").then((data) => {
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
          {isSketchVisible ? "Show Results" : "Perform Assessment"}
        </button>
        {isSketchVisible ? (
          <EyeTrackingSketch />
        ) : (
          <>
            <ScatterChart data={data} />
            <FacetedScatterChart data={data} />
            <BubbleChart data={data} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;

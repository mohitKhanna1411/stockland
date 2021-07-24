import React, { useState } from "react";
import { Graph } from "./Graph";

const allKeys = ["Neutral", "Positive", "Negative"];

const colors = {
  Neutral: "rgb(179,179,179)",
  Positive: "rgb(131,156,155)",
  Negative: "rgb(185,138,93)"
};

const StackedBarChart = ({ data, mainKey }) => {
    const [keys, setKeys] = useState(allKeys);
    // const stackedData = data;
    console.log(data)

  return (
    <div>
      <Graph datasets={data} colors={colors} keys={keys} mainKey={ mainKey }/>
      <div className="fields" style={{ display: "flex" }}>
        {allKeys.map((key) => (
          <div key={key} className="field" style={{ display: "flex" }}>
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter((_key) => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ backgroundColor: colors[key] , color:'#ffffff'}}>
              {key}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedBarChart;

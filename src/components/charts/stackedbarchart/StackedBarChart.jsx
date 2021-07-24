import React, { useState } from "react";
import { Graph } from "./Graph";

const allKeys = ["Neutral", "Positive", "Negative"];

const colors = {
  Neutral: "rgb(179,179,179, 0.8)",
  Positive: "rgb(131,156,155,0.8)",
  Negative: "rgb(185,138,93,0.8)"
};

const StackedBarChart = ({ data }) => {
    const [keys, setKeys] = useState(allKeys);
    // const stackedData = data;
    console.log(data)

  return (
    <div>
      <Graph datasets={data} colors={colors} keys={keys} />
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
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedBarChart;

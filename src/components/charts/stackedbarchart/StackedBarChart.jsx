import React, { useState } from "react";
import { Graph } from "./Graph";

// const data = [
//   {
//     name: "Brand 1",
//     Affiliate: 30,
//     Social: 60,
//     Media: 90
//   },
//   {
//     name: "Brand 2",
//     Affiliate: 30,
//     Social: 45,
//     Media: 80
//   },
//   {
//     name: "Brand 3",
//     Affiliate: 90,
//     Social: 140,
//     Media: 220
//   }
// ];

const allKeys = ["Neutral", "Positive", "Negative"];

const colors = {
  Neutral: "rgba(69, 0, 0, 0.8)",
  Positive: "rgba(240, 72, 19, 0.8)",
  Negative: "rgba(255, 199, 128, 0.8)"
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

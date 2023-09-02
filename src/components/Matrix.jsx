"use client";

import { useEffect, useMemo, useState } from "react";

function Matrix({request, onChange}) {
  const { rows, cols } = request || { rows : 4, cols: 4 };  

  const generateMatrix = (rows, cols) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const min = 1;
        const max = 99;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        row.push(randomNumber);
      }
      matrix.push(row);
    }
    return matrix;
  }

  if (!rows && !cols || rows <= 0 || cols <= 0) {
    return <p>Please provide a valid number.</p>;
  }

  const matrix = generateMatrix(rows, cols);

  const [data, setData] = useState(matrix)

  useEffect(() => {
    onChange(data)
  }, [data])

  return (
    <div>
      <h1 className="text-black font-bold" data-testid="title-matrix">Matrix of {rows}x{cols}</h1>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input placeholder="number" width={30} style={{ color: "black" }} value={row[cellIndex]} onChange={(e) => {
                    const cloned = [...data]
                    if(e.target.value * 1) {
                      cloned[rowIndex][cellIndex] = +e.target.value
                      setData(cloned)
                    }
                  }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Matrix;

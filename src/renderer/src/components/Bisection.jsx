import React, { useState } from 'react';
import { parse } from 'mathjs';
import StaggeredDropDown from './Staggered_Menu';
function evaluateFunction(f, x) {
  try {
    let parsedFunction = parse(f);
    x=parseFloat(x).toFixed(4);
    let compiledFunction = parsedFunction.compile();
    let evaluatedFunction = compiledFunction.evaluate({ x: x });
    return evaluatedFunction;
  } catch (error) {
    alert(error);
  }
}
function Result({ result, tableData }) {
  return (
    <div id="result">
      {tableData.length === 0 ? null : 
      <table className="table-styled">
        <thead>
          <tr>
            <th>Iteration</th>
            <th>a</th>
            <th>b</th>
            <th>x</th>
            <th>f(a)</th>
            <th>f(b)</th>
            <th>f(x)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData) => (
            <tr key={rowData.iteration}>
              <td>{rowData.iteration}</td>
              <td>{rowData.a}</td>
              <td>{rowData.b}</td>
              <td>{rowData.x}</td>
              <td>{rowData.fa}</td>
              <td>{rowData.fb}</td>
              <td>{rowData.fx}</td>
            </tr>
          ))}
        </tbody>
      </table>}
      {result === '' ? null : 
      <div>{result}</div>}
    </div>
  );
}


function Bisection() {
  const [equation, setEquation] = useState('');
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [tableData, setTableData] = useState([]);
  const calculateResult = () => {
    // Convert input values to numbers (assuming they should be numbers)
    let a = parseFloat(lowerBound);
    let b = parseFloat(upperBound);
    let epsilon = parseFloat(error);
    let err = Math.abs((b - a)/2);
    setResult('');
    setTableData([]);
    if (isNaN(a) || isNaN(b) || isNaN(epsilon)) {
      // Handle invalid inputs
      setResult('Invalid input values');
      return;
    }

    if (a >= b) {
      // Handle invalid bounds
      setResult('Invalid bounds (a must be less than b)');
      return;
    }

    const f = equation;
    let iteration = 1;
    let x = a;
    let fa = evaluateFunction(f, a);
    let fb = evaluateFunction(f, b);

    if (fa * fb >= 0) {
      setResult('No root in the given interval');
      return;
    }
    const newTableData = [];
    while (err >= epsilon) {
      err = Math.abs((b - a)/2);
      x = ((a + b) / 2);
      let fx = evaluateFunction(f, x);
      console.log(a,b,err,fx);
      newTableData.push({
        iteration,
        a: a.toFixed(4),
        b: b.toFixed(4),
        x: x.toFixed(4),
        fa: fa.toFixed(4),
        fb: fb.toFixed(4),
        fx: fx.toFixed(4),
      });
      if (fx === 0) {
        setResult(`Found exact root: ${x.toFixed(4)}`);
        setTableData(newTableData);
        return;
      } else if (fa * fx < 0) {
        b = x;
        fb = fx;
      } else {
        a = x;
        fa = fx;
      }

      iteration++;
    }

    setResult(`Approximate root: ${x.toFixed(4)}, Iterations: ${iteration}`);
    setTableData(newTableData);
  };

  return (
    <div className="content-container">

        <div id="calculator">
        <header>
            <h3>Bisection Calculator</h3>
        </header>
        <StaggeredDropDown />
        <input
            className="equation"
            type="text"
            value={equation}
            placeholder="Enter equation"
            onChange={(e) => setEquation(e.target.value)}
        />
        <input
            className="lowerBound"
            type="text"
            value={lowerBound}
            placeholder="Enter a"
            onChange={(e) => setLowerBound(e.target.value)}
        />
        <input
            className="upperBound"
            type="text"
            value={upperBound}
            placeholder="Enter b"
            onChange={(e) => setUpperBound(e.target.value)}
        />
        <input
            className="error"
            type="text"
            value={error}
            placeholder="Enter error"
            onChange={(e) => setError(e.target.value)}
        />
        <button id="calculate" onClick={calculateResult}>
            Calculate
        </button>
        </div>
        <Result result={result} tableData={tableData} />
    </div>
  );
}
export default Bisection;
import React, { useState } from 'react';
import StaggeredDropDown from '../Staggered_Menu';
import Result from '../Result';
import { parse } from 'mathjs';

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
function Bisection({setMode}) {
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
      setResult('Invalid bounds (lb >= ub)');
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
    <>
      <div id="calculator">
      <header>
          <h3>Bisection Calculator</h3>
      </header>
      <StaggeredDropDown setMode={setMode} />
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
          placeholder="Enter lower bound"
          onChange={(e) => setLowerBound(e.target.value)}
      />
      <input
          className="upperBound"
          type="text"
          value={upperBound}
          placeholder="Enter upper bound"
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
      <Result
  result={result}
  tableData={tableData}
  headers={['Iteration', 'a', 'b', 'x', 'f(a)', 'f(b)', 'f(x)']}
  dataKeys={['iteration', 'a', 'b', 'x', 'fa', 'fb', 'fx']}
/>
    </>
  );
}
export default Bisection;
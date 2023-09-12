import React, { useState } from 'react';
import { log, parse } from 'mathjs';
import Result from '../Result';
import StaggeredDropDown from '../Staggered_Menu';
function evaluateFunction(f, x) {
  try {
    let parsedFunction = parse(f);
    x = parseFloat(x).toFixed(4);
    let compiledFunction = parsedFunction.compile();
    let evaluatedFunction = compiledFunction.evaluate({ x: x });
    return evaluatedFunction;
  } catch (error) {
    alert(error);
  }
}

function SecantMethod({setMode}) {
  const [equation, setEquation] = useState('');
  const [initialGuess1, setInitialGuess1] = useState('');
  const [initialGuess2, setInitialGuess2] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [tableData, setTableData] = useState([]);

  const calculateSecant = () => {
    // Convert input values to numbers (assuming they should be numbers)
    let x0 = parseFloat(initialGuess1);
    let x1 = parseFloat(initialGuess2);
    let epsilon = parseFloat(error);
    console.log(x0, x1, epsilon);
    setResult('');
    setTableData([]);

    if (isNaN(x0) || isNaN(x1) || isNaN(epsilon)) {
      // Handle invalid inputs
      setResult('Invalid input values');
      return;
    }

    const f = equation;
    let iteration = 1;
    const newTableData = [];

    while (true) {
      const fx0 = evaluateFunction(f, x0);
      const fx1 = evaluateFunction(f, x1);

      const x2 = x1 - (fx1 * (x1 - x0)) / (fx1 - fx0);

      newTableData.push({
        iteration,
        x0: x0.toFixed(4),
        x1: x1.toFixed(4),
        x2: x2.toFixed(4),
        fx0: fx0.toFixed(4),
        fx1: fx1.toFixed(4),
        fx2: evaluateFunction(f, x2).toFixed(4),
      });

      if (Math.abs(x2 - x1) < epsilon) {
        setResult(`Approximate root: ${x2.toFixed(4)}, Iterations: ${iteration}`);
        setTableData(newTableData);
        console.table(tableData);
        return;
      }

      x0 = x1;
      x1 = x2;
      iteration++;
    }
  };

  return (
    <>
      <div id="calculator" className='secant'>
        <header>
          <h3>Secant Method Calculator</h3>
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
          className="initialGuess1"
          type="text"
          value={initialGuess1}
          placeholder="Enter initial guess 1"
          onChange={(e) => setInitialGuess1(e.target.value)}
        />
        <input
          className="initialGuess2"
          type="text"
          value={initialGuess2}
          placeholder="Enter initial guess 2"
          onChange={(e) => setInitialGuess2(e.target.value)}
        />
        <input
          className="error"
          type="text"
          value={error}
          placeholder="Enter error"
          onChange={(e) => setError(e.target.value)}
        />
        <button id="calculate" onClick={calculateSecant}>
          Calculate
        </button>
      </div>
      <Result
  result={result}
  tableData={tableData}
  headers={['Iteration', 'x0', 'x1', 'x2', 'f(x0)', 'f(x1)', 'f(x2)']}
  dataKeys={['iteration', 'x0', 'x1', 'x2', 'fx0', 'fx1', 'fx2']}
/>

    </>
  );
}

export default SecantMethod;

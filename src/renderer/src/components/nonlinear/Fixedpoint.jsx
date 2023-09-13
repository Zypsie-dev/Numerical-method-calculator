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
    return;
  }
}
function FixedPointMethod({ setMode }) {
  const [equation, setEquation] = useState('');
  const [initialGuess, setInitialGuess] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [tableData, setTableData] = useState([]);

  const calculateResult = () => {
    // Convert input values to numbers (assuming they should be numbers)
    let guess = parseFloat(initialGuess);
    let epsilon = parseFloat(error);
    setResult('');
    setTableData([]);

    if (isNaN(guess) || isNaN(epsilon)) {
      // Handle invalid inputs
      setResult('Invalid input values');
      return;
    }

    const g = equation;
    let iteration = 1;

    const newTableData = [];
    while (iteration < 100) {
      let gx = evaluateFunction(g, guess);
      newTableData.push({
        iteration,
        guess: guess.toFixed(4),
        gx: gx.toFixed(4),
      });

      const nextGuess = gx;
      if (Math.abs(nextGuess - guess) < epsilon) {
        setResult(`Approximate root: ${nextGuess.toFixed(4)}, Iterations: ${iteration}`);
        setTableData(newTableData);
        return;
      }

      guess = nextGuess;
      iteration++;
    }
    setResult(`Method did not converge after 100 iterations.`);
    setTableData(newTableData);
  };

  return (
    <>
      <div id="calculator">
        <header>
          <h3>Fixed-Point Method Calculator</h3>
        </header>
        <StaggeredDropDown setMode={setMode} />
        <input
          className="equation"
          type="text"
          value={equation}
          placeholder="Enter the g(x)"
          onChange={(e) => setEquation(e.target.value)}
        />
        <input
          className="initialGuess"
          type="text"
          value={initialGuess}
          placeholder="Enter initial guess"
          onChange={(e) => setInitialGuess(e.target.value)}
        />
        <input
          className="error"
          type="text"
          value={error}
          placeholder="Enter error tolerance"
          onChange={(e) => setError(e.target.value)}
        />
        <button id="calculate" onClick={calculateResult}>
          Calculate
        </button>
      </div>
      <Result
        result={result}
        tableData={tableData}
        headers={['Iteration', 'Guess (x)', 'g(x)']}
        dataKeys={['iteration', 'guess', 'gx']}
      />
    </>
  );
}

export default FixedPointMethod;

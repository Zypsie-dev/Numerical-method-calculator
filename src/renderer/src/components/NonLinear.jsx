import React, { useState } from 'react';
import Bisection from './nonlinear/Bisection';
import Secant from './nonlinear/Secant';
import FixedPointIteration from './nonlinear/Fixedpoint';
const NumericalMethodsCalculator = () => {
  // State to manage the selected mode
  const [mode, setMode] = useState('bisection');
  return (
    <div className='content-container'>
      {/* Render calculator content based on the selected mode */}
      {mode === 'bisection' && <Bisection setMode = {setMode} />}
      {mode === 'secant' && <Secant setMode = {setMode} />}
      {mode === 'fixed' && <FixedPointIteration setMode = {setMode} />}
    </div>
  );
};

export default NumericalMethodsCalculator;

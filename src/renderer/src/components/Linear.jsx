import React, { useState } from 'react';
import Bisection from './linear/Bisection';
import Secant from './linear/Secant';
const NumericalMethodsCalculator = () => {
  // State to manage the selected mode
  const [mode, setMode] = useState('bisection');
  console.trace(mode);
  return (
    <div className='content-container'>
      {/* Render calculator content based on the selected mode */}
      {mode === 'bisection' && <Bisection setMode = {setMode} />}
      {mode === 'secant' && <Secant setMode = {setMode} />}
    </div>
  );
};

export default NumericalMethodsCalculator;

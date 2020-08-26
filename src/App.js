import React from 'react';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [tabuleiro, setTabuleiro] = useState([]);

  useEffect(() => {
    startTabuleiro();
  }, []);

  const startTabuleiro = () => {
    let newTabuleiro = new Array(200).fill(0);
    newTabuleiro[0] = 2;
    newTabuleiro[newTabuleiro.length - 1] = 3;
    setTabuleiro(newTabuleiro);
  };

  const getColor = (value) => {
    switch (value) {
      case 1:
        return '#334752';
      case 2:
        return '#F0CA4D';
      case 3:
        return '#DE4F3C';
      case 4:
        return '#46B39D';
      case 0:
      default:
        return '#fff';
    }
  };

  const createObstatulo = (idx) => {
    if (idx === 0 || idx === 99) return;

    const newTabuleiro = [...tabuleiro];
    newTabuleiro[idx] = (newTabuleiro[idx] + 1) % 2;
    setTabuleiro(newTabuleiro);
  };

  return (
    <div className='bg-light' style={{ height: '100vh' }}>
      <div className='container'>
        <div class='text-center'>
          <h1 className='mb-3 pt-3' style={{ color: '#334752' }}>
            Projeto policia e ladrão
          </h1>
        </div>

        <div className=''>
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-3 start-btn'>Start</div>
            <div className='tabuleiro'>
              {tabuleiro.map((tab, i) => (
                <button
                  key={i}
                  disabled={false}
                  className='bloco'
                  onClick={() => createObstatulo(i)}
                  style={{
                    backgroundColor: getColor(tab),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

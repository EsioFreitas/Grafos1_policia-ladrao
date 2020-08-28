import React, { useState, useEffect } from 'react';
import './App.css';
import createGraph from './Graph/createGraph';

function App() {
  const [tabuleiro, setTabuleiro] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    startTabuleiro();
  }, []);

  const startTabuleiro = () => {
    let newTabuleiro = new Array(140).fill(0);
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
    if (idx === 0 || idx === 199) return;

    const newTabuleiro = [...tabuleiro];
    newTabuleiro[idx] = (newTabuleiro[idx] + 1) % 2;
    setTabuleiro(newTabuleiro);
  };

  const paint = (path) => {
    let count = 0;
    setInterval(() => {
      count++;
      if (path[count - 1] >= 0 || count === 1) {
        const usedPath = path.slice(0, count);
        const newTabuleiro = tabuleiro.map((value, index) => {
          if (usedPath.includes(index)) {
            return 4;
          }
          return value;
        });
        setTabuleiro(newTabuleiro);
      } else {
        setIsRunning(false);
        clearInterval();
      }
    }, 200);
  };

  const findRobber = () => {
    setIsRunning(true);
    const path = [];
    const graph = createGraph(tabuleiro, 20);
    graph.BFS(0, (currentValue) => {
      path.push(currentValue);
      if (currentValue === 199) return true;
      else return false;
    });
    paint(path);
  };

  return (
    <div className='bg-light' style={{ height: '100vh' }}>
      <div className='container'>
        <div className='text-center'>
          <h1 className='mb-3 pt-3' style={{ color: '#334752' }}>
            PROJETO <b style={{ color: '#F0CA4D' }}>POLICIA</b> E{' '}
            <b style={{ color: '#DE4F3C' }}>LADRÃO</b>
          </h1>
          <p>
            Mario adora convidar seus amigos para brincar em sua casa. Então
            decidiu convidar seus amigos para brincarem de Polícia e Ladrão. O
            jogo consiste em dois grupos, um grupo é a polícia e o outro é o
            grupo dos ladrões. Os ladrões devem se esconder e a polícia deve
            capturá-los. Caso a polícia consiga capturá-los e prendê-los os
            ladrões perdem o jogo e caso a polícia não consiga capturá-los os
            ladrões vencem o jogo. Os ladrões irão se esconder sempre no último
            espaço do labirinto, Se os policiais ficarem encurralados no
            labirinto os ladrões vencem e poderão comemorar a fuga, mas se os
            policiais alcançarem o ultimo espaço do labirinto os policiais serão
            os vencedores. Os policiais poderão andar somente nos blocos não
            marcados.
          </p>
        </div>

        <div className=''>
          <div className='d-flex flex-column align-items-center'>
            <div
              className='d-flex justify-content-between'
              style={{ width: '85%' }}
            >
              <button
                className='mb-3 reset-btn'
                onClick={startTabuleiro}
                disabled={isRunning}
              >
                Reset
              </button>
              <button
                className='mb-3 start-btn'
                onClick={findRobber}
                disabled={isRunning}
              >
                Start
              </button>
            </div>
            <div className='tabuleiro'>
              {tabuleiro.map((tab, i) => (
                <button
                  key={i}
                  disabled={isRunning}
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
        <h1 className='text-center mt-2'>Os policiais ganharam!!!</h1>
      </div>
    </div>
  );
}

export default App;

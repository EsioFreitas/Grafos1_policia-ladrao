import React, { useState, useEffect } from 'react';
import './App.css';
import createGraph from './Graph/index';

const LOADING = 0;
const WIN = 1;
const LOSE = 2;

const BLOCK = 0;
const OBSTACLE = 1;
const POLICE = 2;
const THIEF = 3;
const PATH = 4;

function App() {
  const [board, setBoard] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const [size] = useState(140);
  const [status, setStatus] = useState(LOADING);

  useEffect(() => {
    startBoard();
  }, []);

  const startBoard = () => {
    let newBoard = new Array(size).fill(BLOCK);
    newBoard[0] = POLICE;
    newBoard[size - 1] = THIEF;
    setBoard(newBoard);
    setCanStart(true);
    setStatus(LOADING);
  };

  const getColor = (value) => {
    switch (value) {
      case OBSTACLE:
        return '#334752';
      case POLICE:
        return '#F0CA4D';
      case THIEF:
        return '#DE4F3C';
      case PATH:
        return '#46B39D';
      case BLOCK:
      default:
        return '#fff';
    }
  };

  const createObstacle = (idx) => {
    if (idx === 0 || idx === size - 1) return;

    const newBoard = [...board];
    newBoard[idx] = (newBoard[idx] + 1) % 2;
    setBoard(newBoard);
  };

  const paint = (path) => {
    let count = 0;
    let lose = true;

    const interval = setInterval(() => {
      count++;
      if (path[count - 1] >= 0 || count === 1) {
        const usedPath = path.slice(0, count);
        const newBoard = board.map((value, index) => {
          if (usedPath.includes(index)) {
            if (value === THIEF) {
              setStatus(WIN);
              lose = false;
            }
            return PATH;
          }
          return value;
        });

        setBoard(newBoard);
      } else {
        if (lose) {
          setStatus(LOSE);
        }
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 200);
  };

  const findRobber = () => {
    setIsRunning(true);
    setCanStart(false);
    const path = [];
    const graph = createGraph(board, 20);
    graph.BFS(0, (currentValue) => {
      path.push(currentValue);
      if (currentValue === size - 1) return true;
      else return false;
    });
    paint(path);
  };

  const getStatusText = () => {
    switch (status) {
      case WIN:
        return 'Os policiais ganharam!';
      case LOSE:
        return 'Os ladrões ganharam';
      case LOADING:
      default:
        return '...';
    }
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
                onClick={startBoard}
                disabled={isRunning}
              >
                Reset
              </button>
              <button
                className='mb-3 start-btn'
                onClick={findRobber}
                disabled={!canStart}
              >
                Start
              </button>
            </div>
            <div className='board'>
              {board.map((tab, i) => (
                <button
                  key={i}
                  disabled={isRunning}
                  className='obstacle'
                  onClick={() => createObstacle(i)}
                  style={{
                    backgroundColor: getColor(tab),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <h1
          className='text-center mt-2'
          style={{
            fontWeight: 'bold',
            color:
              status === WIN
                ? '#F0CA4D'
                : status === LOSE
                ? '#DE4F3C'
                : 'black',
          }}
        >
          {getStatusText()}
        </h1>
      </div>
    </div>
  );
}

export default App;

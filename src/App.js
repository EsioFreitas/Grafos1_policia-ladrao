import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [tabuleiro, setTabuleiro] = useState();

  return (
    <div className='bg-light' style={{ height: '100vh' }}>
      <div className='container'>
        <div class='text-center'>
          <h1 class='mb-3 pt-3'>Projeto policia e ladrão</h1>
        </div>

        <div className='row'>
          <div className='col'>
            <h3>1 - coloque os obstaculos</h3>
            <div className='tabuleiro'>
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />

              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />

              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />

              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />

              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
              <div className='bloco' />
            </div>
          </div>
          <div className='col'>arvore</div>
        </div>
      </div>
    </div>
  );
}

export default App;

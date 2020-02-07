import React from 'react'
import { Provider } from 'react-redux'

import { store } from './__data__'

import { Reel } from './components'
import logo from './logo.svg';
import { cherry } from './assets'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Reel isSpinning={true} />
      </div>
    </Provider>
  );
}


export default App;

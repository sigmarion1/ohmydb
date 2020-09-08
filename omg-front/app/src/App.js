import React from 'react';
import { Route, Link } from 'react-router-dom'

import Main from './Main'
import Home from './Home';
import About from './About'

import { useSelector, useDispatch } from 'react-redux'
import { sign_in } from './modules/isLogged'

import Header from './components/Header'
import SampleContainer from './containers/SampleContainer'
import { CssBaseline } from '@material-ui/core';

const App = () => {
  return(
    <>
      <CssBaseline />
      <Header />
      <SampleContainer />

      {/* <h1>Counter {counter.number}</h1>
      <button onClick={() => dispatch(increase(5))}>+</button>
      <button>-</button>

      <button onClick={() => dispatch(sign_in())}>sign in</button>

      {isLogged ? <h3>Valuable Information I shoudlnt see</h3> : ''}
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
      <Link to ="/?detail=true">홈으로가기</Link> */}

    </>
  )
}

export default App;

import React from 'react';
import { Route, Link } from 'react-router-dom'

import Main from './Main'
import Home from './Home';
import About from './About'

const App = () => {
  return(
    <div>
      
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
      <Link to ="/?detail=true">홈으로가기</Link>
    </div>
  )
}

export default App;

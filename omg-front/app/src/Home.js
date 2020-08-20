import React from 'react'
import qs from 'qs'
import Counter from './components/Counter'
import Todos from './components/Todos'

const Home = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    })
    
    return (
        <div>
            <h1>홈{query.detail}</h1>
            <Counter number={0} />
            <hr />
            <Todos />
        </div>
    )
}

export default Home;
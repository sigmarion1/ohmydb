import React from 'react';
import Figure from './Figure'
import img1 from './img/1.jpg'
import img2 from './img/2.jpg'
import img3 from './img/3.jpg'
import img4 from './img/4.jpg'
import './styles/Columns.scss'

const Columns = () => {
    return (
        <div className="Columns">
            <Figure img={img2} />
            <Figure img={img1} />
            <Figure img={img2} />
            <Figure img={img3} />
            <Figure img={img2} />
            <Figure img={img4} />
            <Figure img={img3} />
            <Figure img={img2} />
            <Figure img={img4} />
            <Figure img={img4} />
            <Figure img={img3} />
            <Figure img={img2} />
            <Figure img={img4} />
        </div>
    );
};

export default Columns;
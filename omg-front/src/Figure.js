import React from 'react';
import img1 from './img/1.jpg'
import './styles/Figure.scss'

const Figure = (props) => {



    return (
        <figure>
            <img src={props.img}></img>
            <figcaption>{props.caption}</figcaption>
        </figure>
    );
};

Figure.defaultProps = {
    img: img1,
    caption: 'default caption'
}

export default Figure;
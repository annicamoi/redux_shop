import React from 'react';
import Crystals from './../../assets/crystal.jpg';
import Horoscopes from './../../assets/horoscope.png';
import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
            <div className="item"
                style={{
                    backgroundImage: `url(${Horoscopes})`
                }}
            >
                <a>
Horoscopes
                </a>
            </div>
            <div className="item"
            style={{
                    backgroundImage: `url(${Crystals})`
                }}
            >
<a>
    Crystals
</a>

            </div>
            </div>
        </div>
    );
};

export default Directory;
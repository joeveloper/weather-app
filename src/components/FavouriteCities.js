import React from 'react';

const FavoriteCities = ({ favorites, onSelectCity }) => {
    return (
        <div className="favorites">
            <h3>Favorite Cities</h3>
            <ul>
                {favorites.map((city, index) => (
                    <li className='fave-list' key={index} onClick={() => onSelectCity(city)}>
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteCities;

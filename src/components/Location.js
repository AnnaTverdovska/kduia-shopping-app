// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import { AppContext, CURRENCIES } from '../context/AppContext';

const Location = () => {
    const { dispatch, Location } = useContext(AppContext);

    const changeLocation = (value) => {
        dispatch({
            type: 'CHG_LOCATION',
            payload: value,
        });
    };

    return (
        <div className='currency'>
            <label htmlFor='currency'>Currency</label>
            <select
                id='currency'
                value={Location}
                onChange={(event) => changeLocation(event.target.value)}
            >
                {CURRENCIES.map(({ symbol, label }) => (
                    <option key={symbol} value={symbol}>
                        {symbol} {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Location;

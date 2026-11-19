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
        <div className='alert alert-secondary'>
            <label htmlFor='currency' className='me-2'>
                Location
            </label>
            <select
                id='currency'
                name='Location'
                className='form-select d-inline-block w-auto'
                value={Location}
                onChange={(event) => changeLocation(event.target.value)}
            >
                {CURRENCIES.map(({ symbol, label }) => (
                    <option key={symbol} value={symbol}>
                        {label} ({symbol})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Location;

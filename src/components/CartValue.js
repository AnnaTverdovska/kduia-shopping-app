// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartValue = () => {
    const { CartValue, Location } = useContext(AppContext);

    return (
        <div className='alert alert-primary' data-testid='cart-value'>
            <span>
                Cart Value: {Location}
                {CartValue}
            </span>
        </div>
    );
};

export default CartValue;

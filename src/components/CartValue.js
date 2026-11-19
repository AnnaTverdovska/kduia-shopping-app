// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { formatMoney } from '../money';

const CartValue = () => {
    const { CartValue, Location } = useContext(AppContext);

    return (
        <p className='receipt-total' data-testid='cart-value'>
            <span>Total</span> <span>{formatMoney(Location, CartValue)}</span>
        </p>
    );
};

export default CartValue;

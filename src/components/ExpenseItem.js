// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { formatMoney } from '../money';

const ExpenseItem = (props) => {
    const { dispatch, Location } = useContext(AppContext);

    const handleDeleteItem = () => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: { name: props.name },
        });
    };

    return (
        <tr className='receipt-line'>
            <td>
                <span className='line-name'>{props.name}</span>
                <span className='line-detail'>
                    {props.quantity} × {formatMoney(Location, props.unitprice)}
                </span>
            </td>
            <td className='line-price'>{formatMoney(Location, props.quantity * props.unitprice)}</td>
            <td className='line-remove'>
                <button
                    type='button'
                    className='remove-button'
                    aria-label={`Remove ${props.name}`}
                    title={`Remove ${props.name}`}
                    onClick={handleDeleteItem}
                >
                    <svg aria-hidden='true' viewBox='0 0 16 16' width='14' height='14'>
                        <path
                            d='M3 3l10 10M13 3L3 13'
                            stroke='currentColor'
                            strokeWidth='2.2'
                            strokeLinecap='round'
                        />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default ExpenseItem;

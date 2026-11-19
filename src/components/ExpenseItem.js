// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch, Location } = useContext(AppContext);

    const handleDeleteItem = () => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: { name: props.name },
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
            <td>
                {Location}
                {props.unitprice}
            </td>
            <td>
                {Location}
                {props.quantity * props.unitprice}
            </td>
            <td>
                <button
                    type='button'
                    className='btn btn-link text-danger p-0'
                    aria-label={`Remove ${props.name}`}
                    onClick={handleDeleteItem}
                >
                    <FaTimesCircle size='1.5em' />
                </button>
            </td>
        </tr>
    );
};

export default ExpenseItem;

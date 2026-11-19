// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const ItemSelected = () => {
    const { dispatch, expenses } = useContext(AppContext);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [action, setAction] = useState('Add');
    const [error, setError] = useState('');

    const submitEvent = (event) => {
        event.preventDefault();
        const amount = Number(quantity);

        if (!name) {
            setError('Please choose an item.');
            return;
        }
        if (!Number.isInteger(amount) || amount <= 0) {
            setError('Quantity must be a whole number greater than 0.');
            return;
        }

        dispatch({
            type: action === 'Reduce' ? 'RED_QUANTITY' : 'ADD_QUANTITY',
            payload: { name, quantity: amount },
        });
        setError('');
        setQuantity('');
    };

    return (
        <form onSubmit={submitEvent} noValidate>
            <div className='row g-2 align-items-center'>
                <div className='col-auto input-group mb-3' style={{ width: 'auto' }}>
                    <label className='input-group-text' htmlFor='inputGroupSelect01'>
                        Items
                    </label>
                    <select
                        className='form-select'
                        id='inputGroupSelect01'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    >
                        <option value=''>Choose...</option>
                        {expenses.map((expense) => (
                            <option key={expense.id} value={expense.name}>
                                {expense.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='col-auto input-group mb-3' style={{ width: 'auto' }}>
                    <label className='input-group-text' htmlFor='inputGroupSelect02'>
                        Quantity
                    </label>
                    <select
                        className='form-select'
                        id='inputGroupSelect02'
                        value={action}
                        onChange={(event) => setAction(event.target.value)}
                    >
                        <option value='Add'>Add</option>
                        <option value='Reduce'>Reduce</option>
                    </select>
                    <input
                        required
                        type='number'
                        min='1'
                        step='1'
                        id='quantity'
                        aria-label='Quantity'
                        className='form-control'
                        style={{ maxWidth: '7rem' }}
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                    />
                </div>

                <div className='col-auto mb-3'>
                    <button type='submit' className='btn btn-primary'>
                        Save
                    </button>
                </div>
            </div>
            {error && (
                <div className='alert alert-warning py-2' role='alert'>
                    {error}
                </div>
            )}
        </form>
    );
};

export default ItemSelected;

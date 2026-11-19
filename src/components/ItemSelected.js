// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { formatMoney } from '../money';

const ACTIONS = ['Add', 'Reduce'];

const ItemSelected = () => {
    const { dispatch, expenses, Location } = useContext(AppContext);

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [action, setAction] = useState('Add');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const selected = expenses.find((expense) => expense.name === name);

    const clearMessages = () => {
        setError('');
        setStatus('');
    };

    const submitEvent = (event) => {
        event.preventDefault();
        clearMessages();
        const amount = Number(quantity);

        if (!selected) {
            setError('Choose an item first.');
            return;
        }
        if (!Number.isInteger(amount) || amount <= 0) {
            setError('Enter a whole number above 0.');
            return;
        }
        if (action === 'Reduce' && selected.quantity === 0) {
            setError(`${name} isn't in your cart.`);
            return;
        }

        dispatch({
            type: action === 'Reduce' ? 'RED_QUANTITY' : 'ADD_QUANTITY',
            payload: { name, quantity: amount },
        });

        if (action === 'Add') {
            setStatus(`Added ${amount} × ${name}.`);
        } else if (amount >= selected.quantity) {
            setStatus(`Removed ${name} from your cart.`);
        } else {
            setStatus(`Took ${amount} × ${name} off your cart.`);
        }
        setQuantity('1');
    };

    return (
        <form className='item-form' onSubmit={submitEvent} noValidate>
            <div className='field'>
                <label htmlFor='item'>Item</label>
                <select
                    id='item'
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        clearMessages();
                    }}
                >
                    <option value=''>Choose an item</option>
                    {expenses.map((expense) => (
                        <option key={expense.id} value={expense.name}>
                            {expense.name}
                        </option>
                    ))}
                </select>
                <p className='field-hint'>
                    {selected ? `${formatMoney(Location, selected.unitprice)} each` : ''}
                </p>
            </div>

            <fieldset className='field'>
                <legend>Add or reduce</legend>
                <div className='toggle'>
                    {ACTIONS.map((value) => (
                        <label key={value} className='toggle-option'>
                            <input
                                type='radio'
                                name='action'
                                value={value}
                                checked={action === value}
                                onChange={() => {
                                    setAction(value);
                                    clearMessages();
                                }}
                            />
                            <span>{value}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className='field'>
                <label htmlFor='quantity'>Quantity</label>
                <input
                    id='quantity'
                    className='quantity-input'
                    type='number'
                    inputMode='numeric'
                    min='1'
                    step='1'
                    value={quantity}
                    onChange={(event) => {
                        setQuantity(event.target.value);
                        clearMessages();
                    }}
                />
            </div>

            <div className='form-actions'>
                <button type='submit' className='primary-button'>
                    {action === 'Add' ? 'Add to cart' : 'Reduce in cart'}
                </button>
                {error && (
                    <p className='form-error' role='alert'>
                        {error}
                    </p>
                )}
                <p className='form-status' role='status'>
                    {status}
                </p>
            </div>
        </form>
    );
};

export default ItemSelected;

// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    const itemsInCart = expenses.filter((expense) => expense.quantity > 0);

    if (itemsInCart.length === 0) {
        return <p className='text-muted'>Your cart is empty. Add some items below.</p>;
    }

    return (
        <table className='table'>
            <thead className='thead-light'>
                <tr>
                    <th scope='col'>Items</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Unit Price</th>
                    <th scope='col'>Items Price</th>
                    <th scope='col'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {itemsInCart.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        quantity={expense.quantity}
                        unitprice={expense.unitprice}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ExpenseList;

// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    const itemsInCart = expenses.filter((expense) => expense.quantity > 0);

    if (itemsInCart.length === 0) {
        return <p className='receipt-empty'>Nothing here yet. Add an item to start your receipt.</p>;
    }

    return (
        <table className='receipt-lines'>
            <caption className='visually-hidden'>Items in your cart</caption>
            <thead className='visually-hidden'>
                <tr>
                    <th scope='col'>Item</th>
                    <th scope='col'>Price</th>
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

// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React, { createContext, useReducer } from 'react';

export const CURRENCIES = [
    { symbol: '£', label: 'Pound' },
    { symbol: '$', label: 'Dollar' },
    { symbol: '€', label: 'Euro' },
    { symbol: '₹', label: 'Rupee' },
];

export const initialState = {
    expenses: [
        { id: 'Shirt', name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: 'Jeans', name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: 'Dress', name: 'Dress', quantity: 0, unitprice: 400 },
        { id: 'Dinner set', name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: 'Bags', name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£',
};

const updateQuantity = (state, name, getQuantity) => ({
    ...state,
    expenses: state.expenses.map((expense) =>
        expense.name === name
            ? { ...expense, quantity: getQuantity(expense.quantity) }
            : expense
    ),
});

// The reducer never mutates the previous state, so React re-renders reliably.
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_QUANTITY':
            return updateQuantity(state, action.payload.name, (quantity) =>
                quantity + action.payload.quantity
            );
        case 'RED_QUANTITY':
            // A quantity can never drop below zero.
            return updateQuantity(state, action.payload.name, (quantity) =>
                Math.max(0, quantity - action.payload.quantity)
            );
        case 'DELETE_ITEM':
            return updateQuantity(state, action.payload.name, () => 0);
        case 'CHG_LOCATION':
            return { ...state, Location: action.payload };
        default:
            return state;
    }
};

export const AppContext = createContext();

export const AppProvider = ({ children, initial = initialState }) => {
    const [state, dispatch] = useReducer(AppReducer, initial);

    const CartValue = state.expenses.reduce(
        (total, item) => total + item.unitprice * item.quantity,
        0
    );

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue,
                dispatch,
                Location: state.Location,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

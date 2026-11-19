// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { AppReducer, initialState } from './context/AppContext';

const addItem = (item, quantity, action = 'Add') => {
    fireEvent.change(screen.getByLabelText('Items'), { target: { value: item } });
    fireEvent.change(screen.getByDisplayValue(/^(Add|Reduce)$/), { target: { value: action } });
    fireEvent.change(screen.getByLabelText('Quantity', { selector: 'input' }), {
        target: { value: String(quantity) },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
};

describe('Shopping App', () => {
    test('renders the title and an empty cart', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: 'Shopping App' })).toBeInTheDocument();
        expect(screen.getByTestId('cart-value')).toHaveTextContent('Cart Value: £0');
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    test('adds items and updates the cart value', () => {
        render(<App />);
        addItem('Shirt', 2);
        addItem('Bags', 3);

        const table = screen.getByRole('table');
        expect(within(table).getByText('Shirt')).toBeInTheDocument();
        expect(within(table).getByText('Bags')).toBeInTheDocument();
        // 2 × 500 + 3 × 200
        expect(screen.getByTestId('cart-value')).toHaveTextContent('Cart Value: £1600');
    });

    test('reduces quantities without going below zero', () => {
        render(<App />);
        addItem('Jeans', 2);
        addItem('Jeans', 5, 'Reduce');
        expect(screen.getByTestId('cart-value')).toHaveTextContent('Cart Value: £0');
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    test('removes an item with the remove button', () => {
        render(<App />);
        addItem('Dress', 1);
        addItem('Shirt', 1);
        fireEvent.click(screen.getByRole('button', { name: 'Remove Dress' }));
        expect(screen.queryByText('Dress', { selector: 'td' })).not.toBeInTheDocument();
        expect(screen.getByTestId('cart-value')).toHaveTextContent('Cart Value: £500');
    });

    test('changes the currency everywhere', () => {
        render(<App />);
        addItem('Shirt', 1);
        fireEvent.change(screen.getByLabelText('Location'), { target: { value: '€' } });
        expect(screen.getByTestId('cart-value')).toHaveTextContent('Cart Value: €500');
        expect(within(screen.getByRole('table')).getAllByText('€500')).toHaveLength(2);
    });

    test('shows a message for invalid input instead of saving', () => {
        render(<App />);
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(screen.getByRole('alert')).toHaveTextContent('Please choose an item.');

        addItem('Shirt', 0);
        expect(screen.getByRole('alert')).toHaveTextContent('greater than 0');
        expect(screen.getByTestId('cart-value')).toHaveTextContent('Cart Value: £0');
    });
});

describe('AppReducer', () => {
    test('does not mutate the previous state', () => {
        const next = AppReducer(initialState, {
            type: 'ADD_QUANTITY',
            payload: { name: 'Shirt', quantity: 1 },
        });
        expect(next).not.toBe(initialState);
        expect(initialState.expenses[0].quantity).toBe(0);
        expect(next.expenses[0].quantity).toBe(1);
    });

    test('returns the same state for unknown actions', () => {
        expect(AppReducer(initialState, { type: 'UNKNOWN' })).toBe(initialState);
    });
});

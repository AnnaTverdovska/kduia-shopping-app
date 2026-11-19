// Modified 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { AppReducer, initialState } from './context/AppContext';
import { formatMoney } from './money';

const BUTTON = { Add: 'Add to cart', Reduce: 'Reduce in cart' };

const addItem = (item, quantity, action = 'Add') => {
    fireEvent.change(screen.getByLabelText('Item'), { target: { value: item } });
    fireEvent.click(screen.getByLabelText(action));
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: String(quantity) } });
    fireEvent.click(screen.getByRole('button', { name: BUTTON[action] }));
};

const total = () => screen.getByTestId('cart-value');

describe('Shopping App', () => {
    test('starts with an empty receipt', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: 'Shopping App' })).toBeInTheDocument();
        expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument();
        expect(total()).toHaveTextContent('Total £0');
    });

    test('shows the unit price of the chosen item', () => {
        render(<App />);
        fireEvent.change(screen.getByLabelText('Item'), { target: { value: 'Dinner set' } });
        expect(screen.getByText('£600 each')).toBeInTheDocument();
    });

    test('adds items and updates the total', () => {
        render(<App />);
        addItem('Shirt', 2);
        addItem('Bags', 3);

        const table = screen.getByRole('table');
        expect(within(table).getByText('Shirt')).toBeInTheDocument();
        expect(within(table).getByText('3 × £200')).toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveTextContent('Added 3 × Bags.');
        // 2 × 500 + 3 × 200
        expect(total()).toHaveTextContent('Total £1,600');
    });

    test('reduces quantities without going below zero', () => {
        render(<App />);
        addItem('Jeans', 3);
        addItem('Jeans', 1, 'Reduce');
        expect(screen.getByText('2 × £300')).toBeInTheDocument();

        addItem('Jeans', 5, 'Reduce');
        expect(screen.getByRole('status')).toHaveTextContent('Removed Jeans from your cart.');
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
        expect(total()).toHaveTextContent('Total £0');
    });

    test('removes an item with its remove button', () => {
        render(<App />);
        addItem('Dress', 1);
        addItem('Shirt', 1);
        fireEvent.click(screen.getByRole('button', { name: 'Remove Dress' }));
        expect(within(screen.getByRole('table')).queryByText('Dress')).not.toBeInTheDocument();
        expect(total()).toHaveTextContent('Total £500');
    });

    test('changes the currency everywhere', () => {
        render(<App />);
        addItem('Shirt', 1);
        fireEvent.change(screen.getByLabelText('Currency'), { target: { value: '€' } });
        expect(total()).toHaveTextContent('Total €500');
        expect(within(screen.getByRole('table')).getByText('1 × €500')).toBeInTheDocument();
    });

    test('explains what to fix instead of saving invalid input', () => {
        render(<App />);
        fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
        expect(screen.getByRole('alert')).toHaveTextContent('Choose an item first.');

        addItem('Shirt', 0);
        expect(screen.getByRole('alert')).toHaveTextContent('Enter a whole number above 0.');

        addItem('Dress', 1, 'Reduce');
        expect(screen.getByRole('alert')).toHaveTextContent("Dress isn't in your cart.");
        expect(total()).toHaveTextContent('Total £0');
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

test('formatMoney adds thousands separators', () => {
    expect(formatMoney('£', 12500)).toBe('£12,500');
    expect(formatMoney('₹', 0)).toBe('₹0');
});

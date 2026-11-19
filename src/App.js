// Modified 2023 and 2026 by AnnaTverdovska. Original: IBM Skills Network shopping app template (Apache License 2.0).
import React from 'react';

import { AppProvider } from './context/AppContext';
import CartValue from './components/CartValue';
import ExpenseList from './components/ExpenseList';
import ItemSelected from './components/ItemSelected';
import Location from './components/Location';

const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const App = () => {
    return (
        <AppProvider>
            <header className='topbar'>
                <h1 className='app-title'>Shopping App</h1>
                <Location />
            </header>
            <main className='layout'>
                <section className='shop' aria-labelledby='add-heading'>
                    <h2 id='add-heading' className='section-title'>
                        Add to your cart
                    </h2>
                    <p className='section-lead'>
                        Pick an item and how many you want. Your receipt adds up as you go.
                    </p>
                    <ItemSelected />
                </section>
                <section className='receipt-wrap' aria-labelledby='receipt-heading'>
                    <div className='receipt'>
                        <div className='receipt-head'>
                            <h2 id='receipt-heading'>Your receipt</h2>
                            <span className='receipt-date'>{today}</span>
                        </div>
                        <ExpenseList />
                        <CartValue />
                    </div>
                </section>
            </main>
        </AppProvider>
    );
};

export default App;

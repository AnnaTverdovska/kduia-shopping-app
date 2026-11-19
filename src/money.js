// Formats an amount with the chosen currency symbol, for example £1,600.
export const formatMoney = (symbol, amount) => `${symbol}${amount.toLocaleString('en-GB')}`;

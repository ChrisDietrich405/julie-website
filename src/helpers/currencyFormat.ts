export const currencyFormat = (value: number) => value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
})
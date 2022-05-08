import { cond, identity, T } from 'ramda';

export const formatter = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
    // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    style: 'currency',
    currency: 'USD',
});

export const getAccountType = cond<any, string>([
    [(name) => name.includes('Savings'), () => 'Savings'],
    [(name) => name.includes('Checking'), () => 'Checking'],
    [T, () => 'Unknown type'],
]);

export const trimAccountType = cond<any, string>([
    [(name) => name.includes(' Savings'), (name) => name.replace(' Savings', '')],
    [(name) => name.includes(' Checking'), (name) => name.replace(' Checking', '')],
    [T, identity],
]);

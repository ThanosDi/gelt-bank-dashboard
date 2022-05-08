import '@testing-library/jest-dom';

jest.mock('./api', () => ({
    getBalances: jest.fn(),
    getTransactions: jest.fn(),
}));

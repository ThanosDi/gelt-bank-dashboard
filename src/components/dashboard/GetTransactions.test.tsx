import { render, screen, waitFor, cleanup } from '@testing-library/react';
import GetTransactions from './GetTransactions';
import TestProvider from '../TestProvider';
import { getBalances, getTransactions } from '../../api/index';
import balanceMockResponsePayload from '../../api/balance-mock-response';

describe('GetTransactions', () => {
    afterEach(cleanup);
    test('GetTransactions works', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );
        (getTransactions as jest.MockedFunction<typeof getTransactions>).mockResolvedValue([
            {
                accountId: 1,
                amount: 200,
                id: 1,
            },
            {
                accountId: 1,
                amount: 400,
                id: 2,
            },
            {
                accountId: 1,
                amount: -200,
                id: 2,
            },
        ]);

        render(
            <TestProvider>
                <GetTransactions accountId={1} />
            </TestProvider>
        );

        await waitFor(() => {
            const transactons = screen.queryAllByTestId('transaction');
            expect(transactons.length).toBe(3);
            expect(screen.getByTestId('transactions')).toBeInTheDocument();
            expect(screen.getByText('Transactions')).toBeInTheDocument();
            expect(screen.getByText('$200.00')).toBeInTheDocument();
            expect(screen.getByText('$400.00')).toBeInTheDocument();
        });

        expect(getTransactions).toHaveBeenCalledWith<Parameters<typeof getTransactions>>(1);
        expect(getTransactions).toHaveBeenCalledTimes(1);
    });

    test('GetTransactions throws error', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );
        (getTransactions as jest.MockedFunction<typeof getTransactions>).mockRejectedValue(
            'Async error'
        );

        render(
            <TestProvider>
                <GetTransactions accountId={1} />
            </TestProvider>
        );

        await waitFor(() => {
            expect(
                screen.getByText("API Error occurred: Could not get customer's transactions")
            ).toBeInTheDocument();
        });
    });

    test('GetTransactions return empty transactions', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );
        (getTransactions as jest.MockedFunction<typeof getTransactions>).mockResolvedValue([]);

        render(
            <TestProvider>
                <GetTransactions accountId={1} />
            </TestProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Fetching transactions...')).toBeInTheDocument();
        });
        await waitFor(() => {
            const transactons = screen.queryAllByTestId('transaction');
            expect(transactons.length).toBe(0);
            expect(screen.getByText('No transactions found for this account')).toBeInTheDocument();
        });
    });
});

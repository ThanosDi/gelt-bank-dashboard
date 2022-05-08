import { render, screen, waitFor, cleanup } from '@testing-library/react';
import TopAccounts from './TopAccounts';
import TestProvider from '../TestProvider';
import { getBalances } from '../../api/index';
import balanceMockResponsePayload from '../../api/balance-mock-response';

describe('TopAccounts', () => {
    afterEach(cleanup);
    test('TopAccounts works', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );

        render(
            <TestProvider>
                <TopAccounts />
            </TestProvider>
        );

        await waitFor(() => {
            const accounts = screen.queryAllByTestId('top-account');
            expect(screen.getByTestId('top-accounts')).toBeInTheDocument();
            expect(accounts.length).toBe(3);
            expect(screen.getByText('Miss Janice Wolf')).toBeInTheDocument();
            expect(screen.getByText('$10,000.99')).toBeInTheDocument();
        });
    });
});

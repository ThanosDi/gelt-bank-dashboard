import { render, screen, waitFor, cleanup } from '@testing-library/react';
import TotalBalance from './TotalBalance';
import TestProvider from '../TestProvider';
import { getBalances } from '../../api/index';
import balanceMockResponsePayload from '../../api/balance-mock-response';

describe('TotalBalance', () => {
    afterEach(cleanup);
    test('TotalBalance works', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );

        render(
            <TestProvider>
                <TotalBalance />
            </TestProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('total-balance')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
            expect(screen.getByText('accounts in total')).toBeInTheDocument();
            expect(screen.getByText('$311,143.10')).toBeInTheDocument();
        });
    });
});

import { render, screen, waitFor, cleanup, within } from '@testing-library/react';
import BalanceTable from './BalanceTable';
import TestProvider from '../TestProvider';
import { getBalances } from '../../api/index';
import balanceMockResponsePayload from '../../api/balance-mock-response';

describe('BalanceTable', () => {
    afterEach(cleanup);

    test('BalanceTable works', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );

        render(
            <TestProvider>
                <BalanceTable balance={balanceMockResponsePayload} />
            </TestProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('balance-table')).toBeInTheDocument();
            expect(within(screen.getAllByRole('row')[0]).getAllByRole('columnheader')).toHaveLength(
                3
            );
        });
    });
});

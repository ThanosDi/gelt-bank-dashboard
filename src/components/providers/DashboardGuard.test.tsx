import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { getBalances } from '../../api/index';
import balanceMockResponsePayload from '../../api/balance-mock-response';
import TestProvider from '../TestProvider';

describe('DashboardGuardProvider', () => {
    afterEach(cleanup);
    test('DashboardGuardProvider works', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue(
            balanceMockResponsePayload
        );

        render(
            <TestProvider>
                <div>Children loaded successfully</div>
            </TestProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Children loaded successfully')).toBeInTheDocument();
        });

        expect(getBalances).toHaveBeenCalledTimes(1);
    });

    test('DashboardGuardProvider throws error', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockRejectedValue('Async error');

        render(
            <TestProvider>
                <div>Children loaded successfully</div>
            </TestProvider>
        );

        await waitFor(() => {
            expect(
                screen.getByText('API Error occurred: Could not get customers balance')
            ).toBeInTheDocument();
        });
    });

    test('DashboardGuardProvider return empty balances', async () => {
        (getBalances as jest.MockedFunction<typeof getBalances>).mockResolvedValue([]);

        render(
            <TestProvider>
                <div>Children loaded successfully</div>
            </TestProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Initializing...')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                screen.getByText('It looks like the dashboard is not ready to be used.')
            ).toBeInTheDocument();
        });
    });
});

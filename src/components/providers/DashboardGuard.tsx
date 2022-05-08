import { Stack, Box, Typography } from '@mui/material';
import { isEmpty } from 'ramda';
import { createContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getBalances, Balance } from '../../api';
import { getAccountType, trimAccountType } from '../../utilities/tools';
import { Loading, Error } from '../common';
import { AccessDeniedSvg } from '../icons';

const DashboardGuardContext = createContext<Balance[]>([]);

const AppNotReady = () => (
    <Stack p={2} alignItems="center" justifyContent="center" minHeight="50vh">
        <Box mb={4}>
            <AccessDeniedSvg height={170} />
        </Box>
        <Box maxWidth="370px">
            <Typography data-testid="app-not-ready-message" fontWeight="500">
                It looks like the dashboard is not ready to be used.
            </Typography>
        </Box>
    </Stack>
);

export const DashboardGuardProvider = ({ children }: { children: React.ReactElement }) => {
    const { data: balances, isLoading, error } = useQuery('getBalances', getBalances);

    const value = useMemo(() => {
        if (balances === undefined) {
            return [];
        }
        return balances.map((row) => {
            return {
                ...row,
                name: trimAccountType(row.name),
                accountType: getAccountType(row.name),
            };
        });
    }, [balances]);
    if (error) {
        return <Error text="API Error occurred: Could not get customers balance" />;
    }

    if (isLoading) {
        return <Loading showLogo text="Initializing..." />;
    }

    if (!balances || isEmpty(balances)) {
        return <AppNotReady />;
    }

    return (
        <DashboardGuardContext.Provider value={value}>{children}</DashboardGuardContext.Provider>
    );
};

export default DashboardGuardContext;

import Typography from '@mui/material/Typography';
import { useContext, useMemo } from 'react';
import { Grid } from '@mui/material';
import Title from './Title';
import DashboardGuardContext from '../providers/DashboardGuard';
import { formatter } from '../../utilities/tools';

const TotalBalance = () => {
    const balances = useContext(DashboardGuardContext);

    // Memoize balance and date to optimize rerenders
    const totalBalance = useMemo(
        () => balances.reduce((accumulator, { balance }) => accumulator + balance, 0),
        [balances]
    );

    return (
        <Grid
            container
            direction="column"
            alignItems="stetch"
            flexWrap="nowrap"
            justifyContent="flex-start"
            data-testid="total-balance"
        >
            <Title>Total Balance</Title>

            <Typography
                component="p"
                mt={3}
                variant="h4"
                color="primary"
                sx={{ flexGrow: 1, wordBreak: 'break-all' }}
            >
                {formatter.format(totalBalance)}
            </Typography>

            <Typography color="text.secondary">
                <span style={{ color: '#f26d21' }}>{balances.length}</span> accounts in total
            </Typography>
        </Grid>
    );
};
export default TotalBalance;

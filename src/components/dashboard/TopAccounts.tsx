import Typography from '@mui/material/Typography';
import { useContext, useMemo } from 'react';
import { Avatar, Grid, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import Title from './Title';
import DashboardGuardContext from '../providers/DashboardGuard';
import { formatter, trimAccountType } from '../../utilities/tools';

const TOP_ACCOUNTS_LIMIT = 3;

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const stringToColor = (string: string) => {
    let hash = 0;
    let index;

    /* eslint-disable no-bitwise */
    for (index = 0; index < string.length; index += 1) {
        hash = string.charCodeAt(index) + ((hash << 5) - hash);
    }

    let color = '#';

    for (index = 0; index < 3; index += 1) {
        const value = (hash >> (index * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
};

const stringAvatar = (name: string) => ({
    sx: {
        bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});

const TopAccounts = () => {
    const balances = useContext(DashboardGuardContext);

    // Memoize topAccounts to optimize rerenders
    const topAccounts = useMemo(() => balances.slice(0, TOP_ACCOUNTS_LIMIT), [balances]);

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 150,
            }}
            data-testid="top-accounts"
        >
            <Title>Top Accounts</Title>
            <Stack direction="row" spacing={2} justifyContent="space-around">
                {topAccounts.map((account) => (
                    <Item key={account.id} data-testid="top-account">
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ padding: '20px 40px' }}
                        >
                            <Grid item>
                                <Avatar {...stringAvatar(account.name)}>
                                    <span>{account.name.slice(0, 1)}</span>
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography>{trimAccountType(account.name)}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography component="p" variant="h6" color="#f26d21">
                                    {formatter.format(account.balance)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Item>
                ))}
            </Stack>
        </Paper>
    );
};
export default TopAccounts;

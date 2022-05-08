import { Box, ListItemIcon, Typography } from '@mui/material';
import { isEmpty } from 'ramda';
import { useQuery } from 'react-query';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { Loading, Error } from '../common';
import { getTransactions } from '../../api';
import { formatter } from '../../utilities/tools';

const Transactions = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    minWidth: 260,
}));

const GetTransactions = ({ accountId }: { accountId: number }) => {
    const {
        data: transactions,
        isLoading,
        error,
    } = useQuery(['getTransactions', accountId], () => getTransactions(accountId));

    if (error) {
        return <Error text="API Error occurred: Could not get customer's transactions" />;
    }

    if (isLoading) {
        return <Loading text="Fetching transactions..." height="40" />;
    }

    if (!transactions || isEmpty(transactions)) {
        return <Box>No transactions found for this account</Box>;
    }
    return (
        <Grid item>
            <Transactions data-testid="transactions">
                <Typography align="center" color="primary" variant="h6">
                    Transactions
                </Typography>
                <List>
                    {transactions.map(({ id, amount }) => (
                        <ListItem divider dense key={id} data-testid="transaction">
                            <ListItemText
                                primary={` ${formatter.format(amount)}`}
                                sx={{
                                    color:
                                        amount > 0
                                            ? (theme) => theme.palette.primary.main
                                            : (theme) => theme.palette.info.main,
                                }}
                            />

                            <ListItemIcon>
                                {amount > 0 ? (
                                    <PriceCheckIcon color="primary" sx={{ color: 'primary' }} />
                                ) : (
                                    <CreditCardOffIcon color="info" sx={{ color: 'info' }} />
                                )}
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </Transactions>
        </Grid>
    );
};
export default GetTransactions;

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/system';
import { Balance } from '../../api/index';
import { formatter } from '../../utilities/tools';
import AccountPreview from './AccountPreview';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: 'all 0.1s',
    '& th': {
        fontSize: 18,
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.secondary.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AccountBalanceRow = ({ balance }: { balance: Balance }) => {
    return (
        <StyledTableRow tabIndex={-1} key={balance.id}>
            <TableCell component="th" scope="row" align="left">
                {balance.name}
            </TableCell>
            <TableCell component="th" scope="row" align="right">
                {formatter.format(balance.balance)}
            </TableCell>
            <TableCell component="th" scope="row" align="right">
                <AccountPreview accountId={balance.id} />
            </TableCell>
        </StyledTableRow>
    );
};
export default AccountBalanceRow;

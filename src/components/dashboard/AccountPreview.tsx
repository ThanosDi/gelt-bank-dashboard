import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import GetTransactions from './GetTransactions';

const AccountPreview = ({
    accountId,
}: // setIsActiveRow,
{
    accountId: number;
    // setIsActiveRow: (isActive: boolean) => void;
}) => {
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const open = Boolean(anchorElement);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button
                aria-describedby={id}
                variant="contained"
                size="small"
                sx={{ margin: '0 auto' }}
                onClick={handleClick}
            >
                Transactions
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorElement}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClick={handleClose}
            >
                {open && <GetTransactions accountId={accountId} />}
            </Popover>
        </>
    );
};

export default AccountPreview;

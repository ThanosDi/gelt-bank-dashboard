import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridToolbarExport,
    GridCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { Paper, Toolbar, Typography } from '@mui/material';
import { formatter } from '../../utilities/tools';
import AccountPreview from './AccountPreview';
import { Balance } from '../../api/index';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        sortable: false,
        resizable: false,
        disableColumnMenu: true,
        flex: 0.5,
    },
    { field: 'name', headerName: 'Name', resizable: false, flex: 2 },
    {
        field: 'accountType',
        type: 'singleSelect',
        headerName: 'Account Type',
        valueOptions: ['Checking', 'Savings'],
        resizable: false,
        flex: 1,
        cellClassName: (parameters: GridCellParams) => parameters.value,
    },
    {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        resizable: false,
        flex: 1,
        renderCell: (parameters: GridRenderCellParams<Balance>) =>
            formatter.format(parameters.row.balance),
    },
    {
        field: 'transactions',
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        resizable: false,
        flex: 1,
        disableExport: true,
        renderCell: (parameters: GridRenderCellParams<Balance>) => {
            if (parameters.row.balance <= 0) return null;
            return <AccountPreview accountId={parameters.row.id} />;
        },
    },
];

const NewToolbar = () => (
    <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            backgroundColor: (theme) => theme.palette.primary.main,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
        }}
    >
        <Typography
            sx={{ flex: '1 1 100%', fontSize: '23px' }}
            color="inherit"
            variant="subtitle1"
            component="div"
        >
            Account Balance
        </Typography>

        <GridToolbarExport
            color="secondary"
            sx={{
                fontSize: '18px',
                '& .MuiButton-startIcon svg': {
                    fontSize: '28px',
                },
            }}
        />
    </Toolbar>
);

const AccountBalance = ({ balance }: { balance: Balance[] }) => {
    const [pageSize, setPageSize] = useState<number>(10);

    return (
        <Paper
            sx={{
                width: '100%',
                mb: 2,
                '& .Savings': {
                    color: (theme) => theme.palette.primary.main,
                },
                '& .Checking': {
                    color: (theme) => theme.palette.info.main,
                },
            }}
            data-testid="balance-table"
        >
            <DataGrid
                autoHeight
                disableDensitySelector
                disableColumnSelector
                columns={columns}
                rows={balance}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 25, 100]}
                density="comfortable"
                components={{
                    Toolbar: NewToolbar,
                }}
                initialState={{
                    pagination: {
                        pageSize: 10,
                    },
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
        </Paper>
    );
};

export default AccountBalance;

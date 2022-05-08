import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
    typography: {
        fontFamily: `Lato, "Helvetica Neue", Helvetica, sans-serif`,
        fontSize: 16,
    },

    palette: {
        primary: {
            main: '#17A39B',
        },
        secondary: {
            main: '#fff9f4',
        },
        info: {
            main: '#f26d21',
        },
    },

    components: {
        // Used for displayed typed text
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#17A39B',
                    background: '#17A39B',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#17A39B',
                    background: '#17A39B',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '0px',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '0px',
                },
                cell: {
                    fontSize: '18px',
                },
                columnSeparator: { display: 'none' },
                columnHeaderTitle: {
                    fontSize: '20px',
                },
                toolbarContainer: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    '& .MuiButton-root': {
                        fontSize: '20px',
                    },
                },
                footerContainer: {
                    background: '#17A39B',
                    '& .MuiToolbar-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows':
                        {
                            color: 'white',
                            fontSize: '20px',
                        },
                },
                selectedRowCount: {
                    opacity: 0,
                },
            },
        },
    },
});

export default theme;

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
    Link,
    List,
    Toolbar,
    Box,
    Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useContext, useMemo, useState } from 'react';

import { mainListItems } from './ListItems';
import TotalBalance from './TotalBalance';
import DashboardGuardContext from '../providers/DashboardGuard';
import BalanceTable from './BalanceTable';
import Logo from '../icons/Logo';
import TopAccounts from './TopAccounts';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (property) => property !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const MuiDrawer = styled(Drawer, { shouldForwardProp: (property) => property !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    })
);

const DashboardContent = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const balance = useContext(DashboardGuardContext);
    const today = useMemo(() => new Date(), []);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        noWrap
                        component="h1"
                        variant="h6"
                        color="inherit"
                        sx={{ flexGrow: 1, p: '30px 0' }}
                    >
                        Dashboard
                    </Typography>
                    <Typography color="info">
                        {today.toLocaleString('default', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}{' '}
                    </Typography>
                </Toolbar>
            </AppBar>
            <MuiDrawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [1],
                        backgroundColor: '#fff',
                    }}
                >
                    <Box sx={{ p: '21px 10px' }}>
                        <Logo /> {' Bank'}
                    </Box>

                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />

                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                </List>
            </MuiDrawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 7, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Top Accounts */}
                        <Grid item xs={12} md={12} lg={9}>
                            <TopAccounts />
                        </Grid>
                        {/* Total Balance */}
                        <Grid item xs={12} md={12} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    minHeight: 230,
                                    height: '100%',
                                }}
                            >
                                <TotalBalance />
                            </Paper>
                        </Grid>
                        {/* Balance Table */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <BalanceTable balance={balance} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="text.secondary" align="center" pt={4}>
                        <Link
                            color="inherit"
                            href="https://github.com/ThanosDi/gelt-bank-dashboard"
                        >
                            Gelt Bank Dashboard
                        </Link>{' '}
                        {new Date().getFullYear()}.
                        <br />
                        {'Copyright © ThanosDi '}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};
const Dashboard = () => {
    return <DashboardContent />;
};
export default Dashboard;

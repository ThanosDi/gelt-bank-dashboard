import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; // https://react-query.tanstack.com/devtools#import-the-devtools
import theme from '../utilities/theme';
import Dashboard from './dashboard/Dashboard';
import { DashboardGuardProvider } from './providers/DashboardGuard';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: true,
            retry: 5,
        },
    },
});

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route
                caseSensitive
                path="/"
                element={
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />

                            <QueryClientProvider client={queryClient}>
                                <ReactQueryDevtools initialIsOpen={false} />
                                <DashboardGuardProvider>
                                    <Dashboard />
                                </DashboardGuardProvider>
                            </QueryClientProvider>
                        </ThemeProvider>
                    </StyledEngineProvider>
                }
            />
        </Routes>
    </BrowserRouter>
);
export default App;

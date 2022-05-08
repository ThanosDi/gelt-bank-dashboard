import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; // https://react-query.tanstack.com/devtools#import-the-devtools
import theme from '../utilities/theme';
import { DashboardGuardProvider } from './providers/DashboardGuard';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            // Disable react query cache alltogether for the tests
            staleTime: 0,
            cacheTime: 0,
            retry: false,
        },
    },
});

export const TestProvider = ({ children }: { children: React.ReactElement }) => {
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <DashboardGuardProvider>{children}</DashboardGuardProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default TestProvider;

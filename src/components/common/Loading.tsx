import { Stack, Box, Typography, CircularProgress } from '@mui/material';
import Logo from '../icons/Logo';

type Props = {
    text?: string;
    height?: string;
    showLogo?: boolean;
};

const Loading = (props: Props) => {
    const { text, height, showLogo = false } = props;

    return (
        <Stack
            p={2}
            spacing={1}
            justifyContent="center"
            alignItems="center"
            height={height || '50vh'}
        >
            {showLogo && (
                <Box>
                    <Logo />
                    {' Bank'}
                </Box>
            )}
            <Box>
                <CircularProgress color="info" />
            </Box>

            {text && <Typography variant="overline">{text}</Typography>}
        </Stack>
    );
};

export default Loading;

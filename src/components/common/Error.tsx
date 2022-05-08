import { Box, Stack, Typography } from '@mui/material';
import { BugFixingSvg } from '../icons';

type Props = {
    text?: string;
    height?: string;
};

const Error = (props: Props) => {
    const { text, height } = props;

    return (
        <Stack
            p={2}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            height={height || '50vh'}
        >
            <Box>
                <BugFixingSvg />
            </Box>
            {text && <Typography whiteSpace="pre-line">{text}</Typography>}
        </Stack>
    );
};

export default Error;

import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
    children?: React.ReactNode;
}
const Title = (props: TitleProps) => {
    const { children } = props;
    return (
        <Typography gutterBottom component="h2" variant="h6" color="primary">
            {children}
        </Typography>
    );
};
export default Title;

import { render, screen } from '@testing-library/react';
import Error from './Error';

it('Error works', () => {
    render(<Error text="Error occured" />);
    expect(screen.getByText('Error occured')).toBeInTheDocument();
});

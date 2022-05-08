import { render, screen } from '@testing-library/react';
import Loading from './Loading';

it('Loading works', () => {
    render(<Loading text="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import Title from './Title';

it('Title works', () => {
    render(<Title>A title</Title>);
    expect(screen.getByText('A title')).toBeInTheDocument();
});

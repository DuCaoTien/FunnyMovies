import Header from "./Header";
import { render } from '@testing-library/react';

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
    useLocation: jest.fn()
}));

test('Header runs as expected',  () => {
    const rendered = render(<Header />);
    expect(rendered).toMatchSnapshot();

    const { getByText } = rendered;

    expect(getByText('FUNNY MOVIES')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Register')).toBeInTheDocument();
})

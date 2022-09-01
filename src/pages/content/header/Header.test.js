import Header from "./Header";
import { render, fireEvent } from '@testing-library/react';

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
    useLocation: jest.fn()
}));

test('Header runs as expected',  () => {
    const mockEmail = "someone@gmail.com";
    const mockPass = "Test123!@#";
    const view = render(<Header />);
    const { getByText, getByLabelText } = view;

    expect(getByText('FUNNY MOVIES')).toBeInTheDocument();
    const loginBtn = getByText('Login');
    expect(loginBtn).toBeVisible();
    expect(loginBtn).toHaveAttribute('disabled');

    const registerBtn = getByText('Register');
    expect(registerBtn).toBeVisible();
    expect(registerBtn).toHaveAttribute('disabled');

    const emailInput = getByLabelText('email');
    fireEvent.change(emailInput, {target: {value: mockEmail}})
    expect(emailInput.value).toBe(mockEmail);

    const passInput = getByLabelText('password');
    fireEvent.change(passInput, {target: {value: mockPass}});
    expect(passInput.value).toBe(mockPass);

    expect(loginBtn).not.toHaveAttribute('disabled');
    expect(registerBtn).not.toHaveAttribute('disabled');

    fireEvent.click(registerBtn);

    expect(getByText('Welcome someone@gmail.com')).toBeInTheDocument();
    const shareBtn = getByText('Share a movie');
    expect(shareBtn).toBeVisible();

    const logOutBtn = getByText('Log out');
    expect(logOutBtn).toBeVisible();

    expect(view).toMatchSnapshot();
});


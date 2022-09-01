import SharedMovie from "./SharedMovie";
import { render, fireEvent } from '@testing-library/react';

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
    useLocation: jest.fn()
}));

test('Share movie runs as expected',  () => {
    const view = render(<SharedMovie />);

    const { getByText, getByLabelText } = view;

    expect(getByText('Share a Youtube movie')).toBeInTheDocument();
    expect(getByText('Youtube URL:')).toBeInTheDocument();

    const shareBtn = getByText('Share');
    expect(shareBtn).toBeVisible();
    expect(shareBtn).toHaveAttribute('disabled');

    const urlInput = getByLabelText('url');
    fireEvent.change(urlInput, {target: {value: 'https://www.youtube.com/watch?v=DAJFmBP9dzU'}})
    expect(urlInput.value).toBe('https://www.youtube.com/watch?v=DAJFmBP9dzU');

    expect(shareBtn).not.toHaveAttribute('disabled');
    expect(view).toMatchSnapshot();
});

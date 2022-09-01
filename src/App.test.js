import React from 'react';
import { render, act, fireEvent, cleanup} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from './App';
import { DEFAULT_LINK } from "./constants/link";
import { useNavigate } from "react-router-dom";

const mockedNavigator = jest.fn();
const mockedRoutes = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
    useRoutes: () => mockedRoutes,
    useLocation: jest.fn()
}));

describe("Integration Test", () => {

    afterEach(() => {
        cleanup();
        jest.clearAllMocks()
    });

    test('Dashboard page runs as expected', async () => {
        let view = null;
        const mockEmail = "someone@gmail.com";

        await act(async () => {
            view = render(
                <MemoryRouter initialEntries={["/FunnyMovies/"]}>
                    <App/>
                </MemoryRouter>,
            )
        });

        const {getByText} = view;

        expect(getByText('FUNNY MOVIES')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Register')).toBeInTheDocument();

        expect(getByText(DEFAULT_LINK.channelTitle)).toBeInTheDocument();
        expect(getByText(DEFAULT_LINK.likeCount)).toBeInTheDocument();
        expect(getByText(DEFAULT_LINK.localized.title)).toBeInTheDocument();
        expect(getByText(/Register/i).closest('button')).toHaveAttribute('disabled');

        fireEvent.change(view.getByPlaceholderText("Email"), {
            target: {value: mockEmail}
        });

        fireEvent.change(view.getByPlaceholderText("Password"), {
            target: {value: "Test123!@#"}
        });

        expect(getByText(/Register/i).closest('button')).not.toHaveAttribute('disabled');

        const registerBtn = getByText("Register");
        fireEvent.click(registerBtn);

        expect(getByText(`Welcome ${mockEmail}`)).toBeInTheDocument();
        expect(getByText('Share a movie')).toBeInTheDocument();
        expect(getByText('Log out')).toBeInTheDocument();

        const shareMovieBtn = getByText("Share a movie");
        fireEvent.click(shareMovieBtn);

        const navigate = useNavigate();
        expect(navigate).toBeCalledWith("/FunnyMovies/share");

        expect(view).toMatchSnapshot();
    })

    test('Share movies runs as expected', async () => {
        let view = null;

        await act(async () => {
            view = render(
                <MemoryRouter initialEntries={["/FunnyMovies/share"]}>
                    <App/>
                </MemoryRouter>,
            )
        });

        const {getByText, getByLabelText} = view;

        expect(getByText('FUNNY MOVIES')).toBeInTheDocument();
        expect(getByText('Share a movie')).toBeInTheDocument();
        expect(getByText('Log out')).toBeInTheDocument();

        expect(getByText('Share a Youtube movie')).toBeInTheDocument();
        expect(getByText('Youtube URL:')).toBeInTheDocument();

        const shareBtn = getByText('Share');
        expect(shareBtn).toBeVisible();
        expect(shareBtn).toHaveAttribute('disabled');

        const urlInput = getByLabelText('url');
        fireEvent.change(urlInput, {target: {value: 'https://www.youtube.com/watch?v=DAJFmBP9dzU'}})
        expect(urlInput.value).toBe('https://www.youtube.com/watch?v=DAJFmBP9dzU');

        fireEvent.click(shareBtn);

        expect(view).toMatchSnapshot();
    });
});


import React from 'react';
import {render, act} from "@testing-library/react";

import App from './App';
import {MemoryRouter} from "react-router-dom";

const mockedNavigator = jest.fn();
const mockedRoutes = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
    useRoutes: () => mockedRoutes,
    useLocation: jest.fn()
}));


test('App runs as expected', async () => {
    const badRoute = '/FunnyMovies/'

    let rendered = null;

    await act(async () => {
        rendered = render(
            <MemoryRouter initialEntries={[badRoute]}>
                <App/>
            </MemoryRouter>,
        )
    })

    expect(rendered).toMatchSnapshot();
})

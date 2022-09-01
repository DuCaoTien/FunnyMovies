import DataRow from "./DataRow";
import { render } from '@testing-library/react';

import { DEFAULT_LINK } from "../../../../constants/link";

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
    useLocation: jest.fn()
}));


test('Data row runs as expected', () => {

    const view = render(<DataRow data={DEFAULT_LINK} />);
    const formattedLink = DEFAULT_LINK.link.replace("watch?v=", "embed/").split('&')[0];

    const { getByText, getByTitle } = view;

    expect(getByText(DEFAULT_LINK.localized.title)).toBeInTheDocument();
    expect(getByText("Shared by:")).toBeInTheDocument();
    expect(getByText(DEFAULT_LINK.channelTitle)).toBeInTheDocument();

    expect(getByTitle(formattedLink)).toBeInTheDocument();

    expect(view).toMatchSnapshot();
});

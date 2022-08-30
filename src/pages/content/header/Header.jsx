import { Component, useState } from 'react';
import './styles.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isSignedIn: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange = function ({ target: { name, value } }) {

        this.setState({ [name]: value });

    };

    handleLogin = async function () {
        const { email, password, formControl } = this.state;
    };

    handleLogout = function (event) {
        event.preventDefault();
    };

    handleSubmit = function (event) {
        event.preventDefault();
        this.handleLogin();
    };

    render() {
        const {
            email,
            password,
            isSignedIn
        } = this.state;
        return (
            <header>
                <div className="header_content">
                    <div className="header_side">
                        <div className="logo">FUNNY MOVIES</div>
                    </div>
                    <div className="header_side">
                        <div className='signin'>
                            {(!isSignedIn &&
                                <>
                                    <div>
                                        <input
                                            id="email"
                                            name="email"
                                            className="input"
                                            type="text"
                                            value={email}
                                            onChange={this.handleChange}
                                            autoComplete="email"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            id="password"
                                            name="password"
                                            className="input"
                                            type='password'
                                            value={password}
                                            autoComplete="new-password"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="submit">
                                        <button
                                            tabIndex="0"
                                            name="btn_login"
                                            aria-label='login'
                                            onClick={this.handleSubmit}
                                        >
                                            Login / Register
                                        </button>
                                    </div>
                                </>)
                                ||
                                <>
                                    <div className="">
                                        <span>Welcome</span>
                                        <span>someone@gmail.com</span>
                                    </div>
                                    <div className="submit">
                                        <button
                                            tabIndex="0"
                                            name="btn_share"
                                            aria-label='share'
                                            onClick={this.handleSubmit}
                                        >
                                            Share a movie
                                        </button>
                                    </div>
                                    <div className="submit">
                                        <button
                                            tabIndex="0"
                                            name="btn_logout"
                                            aria-label='logout'
                                            onClick={this.handleLogout}
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </header>
        );
    };
}
export default Header;

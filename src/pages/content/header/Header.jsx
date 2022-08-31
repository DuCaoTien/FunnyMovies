import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty'
import bcrypt from 'bcryptjs'

import { isValidEmail } from "../../../helpers/helpers";

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const LOGIN_BTN_NAME = "btn_login";

function Header() {

    const [state, setState] = useState({
        email: "",
        password: "",
        isSignedIn: false
    });

    const { email, password, isSignedIn } = state;
    const navigate = useNavigate();

    useEffect(function () {
        const signedUser = JSON.parse(localStorage.getItem('signedUser')) || '';
        if (signedUser) {
            return setState((prevState) => {
                return {
                    ...prevState,
                    isSignedIn: true,
                    email: signedUser
                }
            })
        }
    }, [])

    const handleChange = useCallback((event) => {
        setState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    }, []);

    const handleSubmit = useCallback(async (event) => {
        if (!isValidEmail(email)) {
            return toast.error("Email is invalid");
        }

        if (password.length < 6) {
            return toast.error("Password requires 6 characters minimum");
        }

        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const hashedPassword = bcrypt.hashSync(password);
        const duplicateEmailAccount = accounts.find((account) => account.email === email);

        if (event.target.name === LOGIN_BTN_NAME) {
            if (!isEmpty(duplicateEmailAccount)) {
                bcrypt.compare(password, duplicateEmailAccount.password, (err, isExistPassword) => {

                    if (err) {
                        return console.error(err);
                    }

                    if (isExistPassword) {
                        toast.success("Login successful");
                        localStorage.setItem('signedUser', JSON.stringify(email));
                        return setState((prevState) => {
                            return {
                                ...prevState,
                                isSignedIn: true
                            }
                        })
                    } else {
                        toast.error("Password does not match");
                    }

                });
            } else {
                return toast.error("User does not exist");
            }
        } else {
            if (!isEmpty(duplicateEmailAccount)) {
                return toast.error("Duplicate email");
            }

            const data = {
                email,
                password: hashedPassword
            };

            localStorage.setItem('accounts', JSON.stringify([...accounts, data]));
            localStorage.setItem('signedUser', JSON.stringify(email));
            setState((prevState) => {
                return {
                    ...prevState,
                    isSignedIn: true
                }
            })
            return toast.success("Register successful");
        }

    }, [email, password]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('signedUser');
        setState((prevState) => {
            return {
                ...prevState,
                isSignedIn: false
            }
        });
        if (typeof navigate === 'function') {
            navigate('/FunnyMovies/');
        }
    }, [navigate]);

    const handleShareMovie = useCallback(() => {
        if (typeof navigate === 'function') {
            navigate('/FunnyMovies/share');
        }
    }, [navigate]);

    const goHomePage = useCallback(() => {
        if (typeof navigate === 'function') {
            navigate('/FunnyMovies/');
        }
    }, [navigate]);

    return (
        <header>
            <div className="header_content">
                <div className="header_side">
                    <div className="logo" onClick={goHomePage}>FUNNY MOVIES</div>
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
                                        onChange={handleChange}
                                        autoComplete="email"
                                        placeholder='Email'
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
                                        onChange={handleChange}
                                        placeholder='Password'
                                    />
                                </div>
                                <div className="submit">
                                    <button
                                        className='btn'
                                        tabIndex="0"
                                        name={LOGIN_BTN_NAME}
                                        aria-label='login'
                                        onClick={handleSubmit}
                                        disabled={!email || !password}
                                    >
                                        Login
                                    </button>
                                </div>

                                <div className="submit">
                                    <button
                                        className='btn'
                                        tabIndex="0"
                                        name="btn-register"
                                        aria-label='register'
                                        onClick={handleSubmit}
                                        disabled={!email || !password}
                                    >
                                         Register
                                    </button>
                                </div>
                            </>)
                        ||
                        <>
                            <div className="">
                                <span>{`Welcome ${email}`}</span>
                            </div>
                            <div className="submit">
                                <button
                                    className='btn'
                                    tabIndex="0"
                                    name="btn_share"
                                    aria-label='share'
                                    onClick={handleShareMovie}
                                >
                                    Share a movie
                                </button>
                            </div>
                            <div className="submit">
                                <button
                                    className='btn'
                                    tabIndex="0"
                                    name="btn_logout"
                                    aria-label='logout'
                                    onClick={handleLogout}
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
}

export default Header;


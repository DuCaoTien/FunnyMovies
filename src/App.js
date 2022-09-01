import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/content/dashboard";
import Header from "./pages/content/header";
import SharedMovie from "./pages/content/shared-movie";
import { ProtectedRoute } from "./routes/ProtectedRoute";

import "./scss/main.scss";

function App() {
    return (
        <div className="App">
            <React.Fragment>
                <Header/>
                <Routes>
                    <Route exact path='*' element={<Dashboard/>}/>
                    <Route exact path='/FunnyMovies/' element={<Dashboard/>}/>
                    <Route
                        exact
                        path='/FunnyMovies/share'
                        element={
                            <ProtectedRoute>
                                <SharedMovie/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <ToastContainer position="top-left" />
            </React.Fragment>
        </div>
    );
}

export default App;

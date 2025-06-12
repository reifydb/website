import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/home";


function App() {
    return (

        <div className="App">
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <Routes>
                    <Route
                        path={"/"}
                        element={
                            <HomePage/>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

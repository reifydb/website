import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/home";
import {Background} from "@components/background.tsx";
import {CompanyPage} from "@pages/company";
import DocumentationPage from "@pages/documentation";
import {ScrollToTop} from "@components/scroll-top.tsx";


function App() {
    return (
        <div>
            <Background/>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <ScrollToTop/>
                <Routes>
                    <Route
                        exact
                        path={"/"}
                        element={
                            <HomePage/>
                        }
                    />
                    <Route
                        exact
                        path={"/company"}
                        element={
                            <CompanyPage/>
                        }
                    />
                    <Route
                        exact
                        path={"/documentation"}
                        element={
                            <DocumentationPage/>
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

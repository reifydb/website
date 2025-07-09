import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/home";
import {Background} from "@components/background.tsx";
import {CompanyPage} from "@pages/company";
import DocumentationPage from "@pages/documentation";
import {ScrollToTop} from "@components/scroll-top.tsx";
import {DemoPage} from "@pages/demo";


function App() {
    return (
        <div>
            {/*<Background/>*/}
            <HashRouter>
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
                        path={"/demo"}
                        element={
                            <DemoPage/>
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
            </HashRouter>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)

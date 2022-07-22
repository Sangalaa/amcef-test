import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home"));

export default function App() {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

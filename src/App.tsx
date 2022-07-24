import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home"));
const TodoList = lazy(() => import("./pages/todoList"))

export default function App() {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list/:id" element={<TodoList />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../pages/layout/Layout";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";

const routes = createBrowserRouter([
    { // layout of the app 
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <div>Home</div>
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
    },
])

export function AppRouter() {
    return (
        <RouterProvider router={routes} />
    )
}
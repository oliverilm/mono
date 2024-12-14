import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../pages/layout/Layout";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { HomePage } from "../pages/home/HomePage";

const routes = createBrowserRouter([
    { // layout of the app 
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: "/competitions",
                children: [
                    {
                        path: ":slug",
                        element: <h1>Competition</h1>
                    }
                ]
            }
        ]
    },
])

export function AppRouter() {
    return (
        <RouterProvider router={routes} />
    )
}
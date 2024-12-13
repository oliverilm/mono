import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

const routes = createBrowserRouter([
    { // layout of the app 
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <div>Home</div>
            }
        ]
    },
])

export function AppRouter() {
    return (
        <RouterProvider router={routes} />
    )
}
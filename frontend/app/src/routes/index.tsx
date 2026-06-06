import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppPage } from '../pages/app/AppPage';
import { HomePage } from '../pages/home/HomePage';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/apps/:appSlug',
		element: <AppPage />,
	},
]);

export function AppRouter() {
	return <RouterProvider router={routes} />;
}

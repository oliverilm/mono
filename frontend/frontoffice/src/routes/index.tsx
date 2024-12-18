import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../pages/layout/Layout';
import { LoginPage } from '../pages/login/LoginPage';
import { RegisterPage } from '../pages/register/RegisterPage';
import { HomePage } from '../pages/home/HomePage';
import { CompetitionPage } from '../pages/competition/CompetitionPage';
import { ClubPage } from '../pages/club/ClubPage';

const routes = createBrowserRouter([
	{
		// layout of the app
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
			{
				path: '/competitions/:slug',
				element: <CompetitionPage />,
			},
			{
				path: '/clubs/:slug',
				element: <ClubPage />,
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={routes} />;
}

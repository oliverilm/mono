import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppPage } from '@pages/app/AppPage';
import { CompetitionPage } from '@pages/competition/CompetitionPage';
import { HomePage } from '@pages/home/HomePage';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/competitions/:competitionSlug',
		element: <CompetitionPage />,
	},
	{
		path: '/competitions/:competitionSlug/apps/:appSlug',
		element: <AppPage />,
	},
]);

export function AppRouter() {
	return <RouterProvider router={routes} />;
}

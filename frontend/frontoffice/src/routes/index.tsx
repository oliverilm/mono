import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AdminPage } from '../pages/admin/AdminPage';
import { AdminPageLayout } from '../pages/admin/layout/AdminPageLayout';
import { AdminPageModelList } from '../pages/admin/model/AdminPageModelList';
import { AdminPageModelDetail } from '../pages/admin/model/detail/AdminPageModelDetail';
import { ClubPage } from '../pages/club/ClubPage';
import { CompetitionPage } from '../pages/competition/CompetitionPage';
import { HomePage } from '../pages/home/HomePage';
import { Layout } from '../pages/layout/Layout';
import { LoginPage } from '../pages/login/LoginPage';
import { RegisterPage } from '../pages/register/RegisterPage';

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
			{
				path: '/admin/crud',
				element: <AdminPageLayout />,
				children: [
					{ index: true, path: '', element: <AdminPage /> },
					{ path: ':model/list', element: <AdminPageModelList /> },
					{ path: ':model/create', element: <AdminPage /> },
					{ path: ':model/:id', element: <AdminPageModelDetail /> },
					{ path: ':model/:id/edit', element: <AdminPage /> },
					{ path: ':model/:id/delete', element: <AdminPage /> },
				],
			},
		],
	},
]);

export function AppRouter() {
	return <RouterProvider router={routes} />;
}

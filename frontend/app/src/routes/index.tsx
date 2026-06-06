import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ElementPage } from '../pages/element/ElementPage';
import { HomePage } from '../pages/home/HomePage';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/:elementName',
		element: <ElementPage />,
	},
]);

export function AppRouter() {
	return <RouterProvider router={routes} />;
}

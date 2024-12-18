
import { QueryClient, QueryClientProvider } from 'react-query';
import { notifications } from '@mantine/notifications';


export function onError(error: any) {
    notifications.show({
        title: 'Error',
        message: error?.response?.data.message ?? "Undefined error",
        color: 'red',
    })
}

const client = new QueryClient({
    defaultOptions: {
        queries: {
            onError
        },
        mutations: {
            onError
        }
    }
});


export function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}
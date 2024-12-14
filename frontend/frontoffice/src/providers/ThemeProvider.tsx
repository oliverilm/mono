import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';

interface Props {
    children: React.ReactNode
}

const theme =  createTheme({})

export function ThemeProvider({children}: Props) {

    return (
        <MantineProvider theme={theme} >
            <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
    )
}
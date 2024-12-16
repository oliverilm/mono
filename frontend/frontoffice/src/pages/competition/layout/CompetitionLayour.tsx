import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export function CompetitionLayout() {

    return (
        <AppShell>
            <AppShell.Header>
                <h1>Competition</h1>
            </AppShell.Header>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
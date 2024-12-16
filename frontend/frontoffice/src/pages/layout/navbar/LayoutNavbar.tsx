import { AppShell, NavLink } from "@mantine/core";
import { IconChevronRight, IconCup, IconHome, IconLogout } from "@tabler/icons-react";
import { useAuthStore } from "../../../stores/auth";
import { useQuery } from "react-query";
import { getPrivateCompetitions } from "../../../api/common";
import { useNavigate } from "react-router-dom";

export function LayoutNavbar() {

    const authStore = useAuthStore()
    const navigate = useNavigate()

    const { data } = useQuery({
        queryKey: ["competitions-private", authStore.isAuthenticated],
        queryFn: () => getPrivateCompetitions()
    })

    const iconProps = { size: "1rem", stroke: 1.5 }
    const Chevron = () => <IconChevronRight {...iconProps} className="mantine-rotate-rtl" />


    return (
        <AppShell.Navbar>
            <AppShell.Section grow>
                <NavLink label="My club" leftSection={<IconHome  {...iconProps}/>} rightSection={<Chevron />} active />

                {data && data?.data?.length > 0 && (
                    <NavLink label="Unpublished events" leftSection={<IconCup {...iconProps}/>}>
                        {data?.data?.map((competition) => (
                            <NavLink key={competition.id} label={competition.name} rightSection={<Chevron />} onClick={() => navigate(`/competitions/${competition.slug}`)}/>
                        ))}
                    </NavLink>
                )}
            </AppShell.Section>
            <AppShell.Section>
                <NavLink label="Log out" onClick={authStore.logout} rightSection={<IconLogout {...iconProps} />}/>
            </AppShell.Section>
        </AppShell.Navbar>
        
    )
}
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CreateCompetition } from "@monorepo/utils";
import { CompetitionAPI } from "../../../../api/common";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useAuthStore } from "../../../../stores/auth";

export function CompetitionFrom() {
    const navigate = useNavigate()
    const authStore = useAuthStore()
    const queryClient = useQueryClient()
    const form = useForm<CreateCompetition>({
        initialValues: {
            name: ""
        }
    })



    const onSubmit =  async (values: typeof form.values) => {
        const response = await CompetitionAPI.createCompetition(values)
        if (response) {
            queryClient.invalidateQueries(["competitions-private", authStore.isAuthenticated])
            navigate(`/competitions/${response.data.slug}`)
        }
            
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput type="text" {...form.getInputProps("name")} />

            <Button type="submit">create</Button>
        </form>
    )
}
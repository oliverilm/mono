import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ClubCreate } from "@monorepo/utils";
import { createClub } from "../../../api/common";

export function ClubForm() {
    const form = useForm<ClubCreate>({
        initialValues: {
            name: "",
            country: "EE"
        }
    })

    const onSubmit = async (values: typeof form.values) => {
        console.log(values)
        const club = await createClub(values)

        if (club) {
            console.log(club)
        }
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput type="text" {...form.getInputProps("name")} />
            <TextInput type="text" {...form.getInputProps("country")} />
            <Button type="submit"> create</Button>
        </form>
    )
}
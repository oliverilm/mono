import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CreateCompetition } from "@monorepo/utils";
import { createCompetition } from "../../../api/common";

export function CompetitionFrom() {

    const form = useForm<CreateCompetition>({
        initialValues: {
            name: ""
        }
    })



    const onSubmit =  async (values: typeof form.values) => {
        console.log(values)

        const response = await createCompetition(values)
        if (response) {

            // TODO: redirect to the next page where the user 
            // will finish the competition form
            console.log(response)
        }
            
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput type="text" {...form.getInputProps("name")} />

            <Button type="submit">create</Button>
        </form>
    )
}
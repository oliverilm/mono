import { Button, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { CreateCompetitionLink } from "@monorepo/utils"
import { useMutation } from "react-query"
import { CompetitionAPI, CompetitionListItem } from "../../../../api/common"

export interface Props {
    competition: CompetitionListItem
    onDone: () => void
}
export function CompetitionLinkFrom({ competition, onDone }: Props) {

    const form = useForm<CreateCompetitionLink>({
        initialValues: {
            label: '',
            url: ''
        }
    })

    const { mutate } = useMutation((data: CreateCompetitionLink) => CompetitionAPI.createCompetitionLink(competition.slug,  data), {
        onSuccess: () => {
            onDone()
        }
    })

    const onSubmit = (values: typeof form.values) => {
        mutate(values)
    }

    
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput label="label" {...form.getInputProps('label')} />
            <TextInput label="url" {...form.getInputProps('url')} />
            <Button type="submit">Submit</Button>
        </form>
    )
}
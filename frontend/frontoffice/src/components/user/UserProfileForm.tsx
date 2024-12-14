import { useForm } from "@mantine/form";
import { useAuthStore } from "../../stores/auth";
import { Button, TextInput } from "@mantine/core";

export function UserProfileForm() {
    const authStore = useAuthStore()

    const form = useForm({
        initialValues: {
            firstName: authStore.profile?.firstName ?? "",
            lastName: authStore.profile?.lastName ?? "",
            natiionalId: authStore.profile?.nationalId ?? "",
            nationalIdType: authStore.profile?.nationalIdType ?? "",
            dateOfBirth: authStore.profile?.dateOfBirth ?? ""
        }
    })

    const onSubmit = async (data: typeof form.values) => {
        console.log(data)
        // TODO: implement
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <h1>Profile</h1>
            <TextInput label={"firstName"} {...form.getInputProps("firstName")} />
            <TextInput label={"lastName"} {...form.getInputProps("lastName")} />
            <TextInput label={"nationalId"} {...form.getInputProps("nationalId")} />
            <TextInput label={"nationalIdType"} {...form.getInputProps("nationalIdType")} />
            <TextInput label={"dateOfBirth"} {...form.getInputProps("dateOfBirth")} />

            <Button type="submit">Update</Button>
        </form>
    )
}
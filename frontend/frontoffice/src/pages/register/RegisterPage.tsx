import { useForm } from "@mantine/form"
import { createUser } from "../../api/auth"
import { useAuthStore } from "../../stores/auth"
import { Button, TextInput } from "@mantine/core"
import { useAuthenticatedRedirectToHome } from "../../hooks/useAuthenticatedRedirectToHome"
import { LS_TOKEN_KEY } from "../../constants"
import { LoginCredentials } from "@monorepo/utils"

export function RegisterPage() {
    useAuthenticatedRedirectToHome()

    const authStore = useAuthStore()
    const form = useForm<LoginCredentials>({
        initialValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: typeof form.values) => {
        const loginReponse = await createUser(data)
        // TODO. this is an inconsistency. login response will contain a token and a profile
        // token should not go to the profile data
        if (loginReponse) {
            authStore.setProfile(loginReponse.data.profile)
            localStorage.setItem(LS_TOKEN_KEY, loginReponse.data.token)
            
        }
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <h1>Register Page</h1>
            <TextInput {...form.getInputProps("email")} label="email" />
            <TextInput {...form.getInputProps("password")} label="password" type="password" />
            {/* TODO add password step 2 aswell */}
            <Button type="submit">register</Button>
        </form>
    )
}
import { useSystemAuth } from "../hooks/useSystemAuth";

import { UserProfileForm } from "../components/user/UserProfileForm";
import { useAuthStore } from "../stores/auth";
import { Modal } from "@mantine/core";

export function SystemAuth() {
    useSystemAuth()

    const authStore = useAuthStore()

    if (authStore.profile) {
        const {profile} = authStore
        
        if (!(profile.lastName 
            && profile.lastName 
            && profile.nationalId 
            && profile.nationalIdType 
            && profile.sex 
            && profile.dateOfBirth)) {

            return (
                <Modal opened onClose={() => {
                    console.log("closing")
                }} withCloseButton={false}>
                    <UserProfileForm />
                </Modal>
            )
        }
    }

    return null
}
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";

export function useAuthenticatedRedirectToHome() {
    const navigate = useNavigate()
    const authStore = useAuthStore()

    useEffect(() => {
        if (authStore.isAuthenticated) navigate("/", { replace: true })
        return;
    }, [authStore.isAuthenticated, navigate])

}

export function tryHandleKnownErrors(error: Error) {
    if (error.message.toLowerCase().includes("unique")) {
        throw new Error("Unique constraint failed")
    }
    throw error
}
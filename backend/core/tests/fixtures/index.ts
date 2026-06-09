import { populateCompetitions } from "./competitions";
import { populateUsers } from "./users";

export async function populate() {
    await populateUsers()
    await populateCompetitions()
}
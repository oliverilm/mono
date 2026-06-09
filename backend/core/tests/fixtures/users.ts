import { prisma } from "../../src/app/utils/db";
import { createId } from "./utils/cuid";

const base = {
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
    isAdmin: false,
}
const Users = {
    Oliver: {
        id: createId(),
        email: "oliver@test.com",
        ...base,
    },
    John: {
        id: createId(),
        email: "john@test.com",
        ...base,
    },
    Mary: {
        id: createId(),
        email: "mary@test.com",
        ...base,
    },
    Jane: {
        id: createId(),
        email: "jane@test.com",
        ...base,
    },
}

const Admins = {
    Oliver: {
        id: "test_user_1_id",
        email: "admin@ipponjudo.com",
        ...base,
        isAdmin: true,
    },
}


function populateUsers() {
    return prisma.user.createMany({data: [
        ...Object.values(Users), 
        ...Object.values(Admins)
    ]})
}

export { Users, populateUsers, Admins }


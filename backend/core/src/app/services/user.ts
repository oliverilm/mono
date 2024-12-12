import { Session, UserProfile } from "@prisma/client"
import securify from "./securify"
import session from "./session"
import { NationalId, NationalIDUtils } from "@monorepo/utils";
import { capitalizeFirstLetter } from "../utils/string"
import { tryHandleKnownErrors } from "../utils/error"
import { LoginCredentials, UserPatch } from "../schemas/auth";
import { prisma } from "../utils/db";

export interface AuthenticationPayload {
    profile: UserProfile,
    token: Session["token"]
}

async function login({ email, password }: LoginCredentials): Promise<AuthenticationPayload> {
    const user = await prisma.user.findFirst({
        where: {
            email,
            password: securify.hashPassword(password)
        }
    })

    if (!user) {
        throw new Error('Invalid credentials')
    }

    const profile = await prisma.userProfile.findUnique({
        where: {
            userId: user.id
        }
    })

    if (!profile) throw new Error("aaa")

    const token = (await session.createSession(user.id)).token
    
    return {
        profile,
        token
    }
}

async function  getUserProfile(userId: string): Promise<UserProfile | null> {
    const profile = await  prisma.userProfile.findUnique({
        where: {
            userId
        },
    })

    return profile
}

async function createUser({ email, password }: LoginCredentials): Promise<AuthenticationPayload | void> {
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: securify.hashPassword(password),
            }
        })

        if (!user) {
            throw new Error("something went wrong")
        }

        const [profile, sess] = await Promise.all([
            prisma.userProfile.create({
                data: {
                    userId: user.id
                }
            }),
            session.createSession(user.id)
        ])

        return {
            profile, 
            token: sess.token
        }
    } catch (error) {
        // @ts-expect-error --un
        if (error.message.includes("Unique constraint")) {
            throw new Error("Email already used")
        }

        throw error
    }
}

async function updateUserProfile(payload: UserPatch): Promise<UserProfile | null> {
    const { userId, ...rest } = payload

    // validate national id with its type and b-day
    if (rest.nationalIdType && rest.nationalId) {
        let parsed = null;
        if (rest.nationalIdType === NationalId.Est) {
            parsed = NationalIDUtils.parseEstonianIdCode(rest.nationalId)
        } else {
            parsed = NationalIDUtils.parseFinnishIdCode(rest.nationalId)
        }

        if (!parsed) {
            throw new Error("Invalid national id")
        }

        // validate b day with national id
        const dateOfBirth = new Date(rest.dateOfBirth)
        const { meta: { fullBirthYear }, birthMonth, birthDay } = parsed

        if (!(
            fullBirthYear === dateOfBirth.getFullYear() 
            && Number(birthMonth) === dateOfBirth.getMonth() 
            && Number(birthDay) === dateOfBirth.getDate()
        )) {
            throw new Error("Date of birth does not match the national id code")
        }
    }


    try {
        const profile = await prisma.userProfile.update({
            where: {
                userId
            },
            data: {
                firstName: capitalizeFirstLetter(rest.firstName),
                lastName: capitalizeFirstLetter(rest.lastName),
                nationalId: rest.nationalId,
                nationalIdType: rest.nationalIdType,
                dateOfBirth: new Date(rest.dateOfBirth)
            }
        })

        return profile
    } catch (error) {
        tryHandleKnownErrors(error as Error)
        return null;
    }
}


export const UserService = {
    createUser,
    login,
    getUserProfile,
    updateUserProfile
}

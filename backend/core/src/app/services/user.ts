import { Session, UserProfile } from "@prisma/client"
import securify from "./securify"
import session from "./session"
import { LoginCredentials, NationalId, NationalIDUtils, UserPatch } from "@monorepo/utils";
import { capitalizeFirstLetter } from "../utils/string"
import { tryHandleKnownErrors } from "../utils/error"
import { prisma } from "../utils/db";

export interface AuthenticationPayload {
    profile: UserProfile,
    token: Session["token"]
}

export const UserService = {
    createUser: async function ({ email, password }: LoginCredentials): Promise<AuthenticationPayload | void> {
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
    },

    login: async function ({ email, password }: LoginCredentials): Promise<AuthenticationPayload> {
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
    },
    getUserProfile: async function (userId: string): Promise<UserProfile | null> {
        const profile = await  prisma.userProfile.findUnique({
            where: {
                userId
            },
        })
    
        return profile
    },
    updateUserProfile: async function(payload: UserPatch): Promise<UserProfile | null> {
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
                && Number(birthMonth) === dateOfBirth.getMonth() +1
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
    },

    searchByEmailExactMatch: async function(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
            }
        })
    },
}

import { Prisma } from "@prisma/client"
import { client } from "./utils/client"


const categories: Prisma.CategoryCreateManyInput[] = [
    { value: "u9"}, 
    { value: "u11"}, 
    { value: "u13"}, 
    { value: "u15"}, 
    { value: "u17"}, 
    { value: "u19"}, 
    { value: "u21"}, 
    { value: "seniors"}, 
    { value: "veterans"}
]

export async function seedCategories() {
  await client.category.createMany({
    data: categories,
    skipDuplicates: true
  })
}

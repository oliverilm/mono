import { seedCategories } from "./seed-categories";
import { client } from "./utils/client";

async function main() {
  await seedCategories()
}

main()
  .then(async () => {
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
import { defineConfig } from 'vitest/config'
export const extensions = '{js,mjs,ts,mts}';

export default defineConfig({
  
  test: {
    env: {
      DATABASE_URL: "postgresql://postgresUser:postgresPW@localhost:5455/postgresDB?shema=test"
    },
    allowOnly: true,
        globals: true,
        pool: 'forks',
        poolOptions: {
            forks: {
                // https://vitest.dev/config/#pooloptions-forks-singlefork
                // "tests will run sequentially, but in the same global context,
                // so you must provide isolation yourself."
                // At the moment of this comment, this is 3x faster than using all available cpus
                singleFork: true,
            },
        },
        restoreMocks: true,
        sequence: { hooks: 'stack' },
        include: [`tests/**/*.test.ts`],
  },

})
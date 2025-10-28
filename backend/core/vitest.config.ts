import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/main.ts", "src/app/app.ts"],
      reporter: ["text", "json", "html"],
    },
    env: {
      DATABASE_URL: "postgresql://postgresUser:postgresPW@localhost:5455/postgresDB"
    },
    allowOnly: true,
    globals: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
    restoreMocks: false,
    mockReset: true,
    sequence: { hooks: 'stack' },
    include: [`tests/**/*.test.ts`],
  },
})

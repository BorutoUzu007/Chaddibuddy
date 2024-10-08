import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql', 
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});

console.log({
  url: process.env.DB_URL!,
});
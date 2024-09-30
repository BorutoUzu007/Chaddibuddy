import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!process.env.DB_URL) {
    throw new Error('Missing DATABASE_URL')
  }

  let db: PostgresJsDatabase
  if (process.env.NODE_ENV === 'development') {
    db = singleton('db', () => {
      if (!process.env.DB_URL) {
        throw new Error('Missing DATABASE_URL')
      }
      const migrationClient = postgres(process.env.DB_URL, { max: 1 })
      migrate(drizzle(migrationClient), {
        migrationsFolder: 'drizzle',
      })
      const queryClient = postgres(process.env.DB_URL)
      return drizzle(queryClient)
    })
  }
  if (process.env.NODE_ENV === 'production') {
    const queryClient = postgres(process.env.DB_URL || "")
    db = drizzle(queryClient)
  }
  
  export function singleton<Value>(name: string, value: () => Value): Value {
    const yolo = global as any
    yolo.__singletons ??= {}
    yolo.__singletons[name] ??= value()
    return yolo.__singletons[name]
  }
  
  export { db }
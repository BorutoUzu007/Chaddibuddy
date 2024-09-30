import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';


async function doMigrate() {
    if (process.env.DB_URI !== undefined ) {
        const migrationClient = postgres(process.env.DB_URL || "", { max: 1 })
        await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle"});
        console.log("Migration done!")
    }
    else {
        console.log(process.env.DB_URL)
        console.log("Undefind Database URI");
    }
}

doMigrate();
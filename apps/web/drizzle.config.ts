import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql", // Updated from 'driver: pg' to 'dialect: postgresql' for newer drizzle-kit
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Changed from connectionString to url
    },
} satisfies Config;

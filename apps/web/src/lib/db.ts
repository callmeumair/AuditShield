import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Sanitize the connection string in case it includes 'psql ' prefix or quotes (common copy-paste error)
const connectionString = (process.env.DATABASE_URL || 'postgres://placeholder_user:placeholder_password@placeholder_host:5432/placeholder_db')
    .replace(/^psql\s+/, '') // Remove 'psql ' prefix
    .replace(/^['"]|['"]$/g, ''); // Remove surrounding quotes

const sql = neon(connectionString);
export const db = drizzle(sql);

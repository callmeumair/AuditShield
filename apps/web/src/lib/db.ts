import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL || 'postgres://placeholder_user:placeholder_password@placeholder_host:5432/placeholder_db');
export const db = drizzle(sql);

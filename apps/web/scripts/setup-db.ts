import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
    console.log('🔍 Checking database connection...');

    try {
        // Test connection
        const result = await sql`SELECT NOW()`;
        console.log('✅ Database connected:', result[0].now);

        // Check if tables exist
        const tables = await sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;

        console.log('\n📋 Existing tables:', tables.map(t => t.table_name));

        // Check if we have any organizations
        const orgs = await sql`SELECT * FROM organizations LIMIT 1`;

        if (orgs.length === 0) {
            console.log('\n⚠️  No organizations found. Creating default organization...');

            const newOrg = await sql`
                INSERT INTO organizations (name, slug, plan)
                VALUES ('Default Organization', 'default-org', 'active')
                RETURNING *
            `;

            console.log('✅ Created organization:', newOrg[0]);
        } else {
            console.log('\n✅ Organization exists:', orgs[0]);
        }

        // Check policies
        const policyCount = await sql`SELECT COUNT(*) as count FROM policies`;
        console.log(`\n📊 Policies in database: ${policyCount[0].count}`);

        // Check audit events
        const eventCount = await sql`SELECT COUNT(*) as count FROM audit_events`;
        console.log(`📊 Audit events in database: ${eventCount[0].count}`);

        console.log('\n✅ Database setup complete!');

    } catch (error) {
        console.error('❌ Database error:', error);
        process.exit(1);
    }
}

setupDatabase();

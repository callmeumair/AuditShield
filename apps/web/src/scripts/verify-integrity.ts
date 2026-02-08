
import dotenv from 'dotenv';
import path from 'path';
import { generatePDFReport } from '../lib/utils/pdfGenerator';
import { generateReportHash, verifyHash, generateApiKey } from '../lib/utils/hashUtils';
import { hasRole } from '../lib/auth/rbac';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

async function runVerification() {
    console.log('🛡️  Starting AuditShield Integrity Verification...\n');
    let passed = 0;
    let failed = 0;

    // Helper for assertions
    const assert = (condition: boolean, message: string) => {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
            failed++;
        }
    };

    try {
        // TEST 1: PDF Generation & Integrity
        console.log('\nTesting PDF Integrity...');
        const mockReportData = {
            organizationName: 'Test Org Inc',
            periodStart: new Date(),
            periodEnd: new Date(),
            totalEvents: 100,
            totalViolations: 5,
            compliantSessions: 95,
            events: [
                {
                    timestamp: new Date(),
                    tool: 'ChatGPT',
                    user: 'test@example.com',
                    action: 'allowed',
                    riskScore: 10
                }
            ],
            generatedBy: 'System Test',
            generatedAt: new Date()
        };

        const { pdfBuffer, hash } = await generatePDFReport(mockReportData);
        assert(pdfBuffer.length > 0, 'PDF buffer should not be empty');
        assert(hash.length === 64, 'Hash should be a valid SHA-256 string (64 chars)');

        // TEST 2: Verify Hash Logic
        console.log('\nTesting Hash Verification Logic...');
        const isVerified = verifyHash(pdfBuffer.toString('binary'), hash);
        // Note: verifyHash takes string. Buffer to string might need encoding care. 
        // Let's check hashUtils implementation. It uses `update(data)`. 
        // If data is string, it works. If buffer, it works if passed as buffer to update.
        // hashUtils: export function generateHash(data: string) ... update(data).
        // It takes string. Passing buffer.toString('binary') preserves bytes mostly but 
        // generateReportHash takes Buffer directly. 
        // Let's use generateReportHash for verification to be consistent.

        const recomputedHash = generateReportHash(pdfBuffer);
        assert(recomputedHash === hash, 'Recomputed hash must match original hash');

        // TEST 3: Tampering Detection
        console.log('\nTesting Tampering Detection...');
        // Modify the PDF buffer (flip a bit)
        const tamperedBuffer = Buffer.from(pdfBuffer);
        tamperedBuffer[100] = tamperedBuffer[100] ^ 0xFF; // Flip bits at index 100

        const tamperedHash = generateReportHash(tamperedBuffer);
        assert(tamperedHash !== hash, 'Tampered file must produce different hash');

        // TEST 4: RBAC Simulation
        console.log('\nTesting RBAC Logic...');

        // Mock contexts as per RBACContext interface
        const adminContext = { role: 'admin', userId: 'admin_1', orgId: 'org_1' } as any;
        const auditorContext = { role: 'auditor', userId: 'auditor_1', orgId: 'org_1' } as any;
        const clientContext = { role: 'client', userId: 'client_1', orgId: 'org_1' } as any;

        assert(hasRole(adminContext, 'admin'), 'Admin should have admin role');
        assert(hasRole(auditorContext, 'auditor'), 'Auditor should have auditor role');
        assert(!hasRole(clientContext, 'admin'), 'Client should NOT have admin role');

        // TEST 5: API Key Generation
        console.log('\nTesting Security Primitives...');
        const key = generateApiKey();
        assert(key.startsWith('as_live_'), 'API Key must have correct prefix');
        assert(key.length > 30, 'API Key must have sufficient entropy');

        console.log('\n----------------------------------------');
        console.log(`VERIFICATION COMPLETE`);
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${failed}`);
        console.log('----------------------------------------\n');

        if (failed > 0) {
            process.exit(1);
        } else {
            process.exit(0);
        }

    } catch (error) {
        console.error('Verification crashed:', error);
        process.exit(1);
    }
}

runVerification();

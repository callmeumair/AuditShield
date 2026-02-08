# AuditShield: SOC 2 Type II Control Mapping

**Disclaimer**: This document maps AuditShield's technical features to relevant SOC 2 Trust Services Criteria. It is intended to assist auditors in evaluating the system's design. It does not constitute a SOC 2 certification or attestation.

**Scope**: Security, Availability, Confidentiality.

---

## CC1. Control Environment

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **CC1.0** | **Identity and Access Management** | Access to the administrative dashboard is restricted to authorized personnel via Clerk authentication. | Clerk Session Logs, User Metadata (Role) | Attempt login with unauthenticated user; verify redirect to sign-in. Check `RBACContext` in logs. |
| **CC1.2** | **Personnel Integrity & Ethics** | All administrative actions are attributable to specific user IDs. Shared accounts are technically discouraged by the identity provider model. | `userId` field in `audit_logs` table. | Query `audit_logs` for distinct `userId`s to demonstrate attribution. |

## CC2. Communication and Information

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **CC2.1** | **Internal & External Communication** | Security policies are versioned and stored immutably. Changes to policies are broadcast to the immutable ledger. | `policies` table (versioned), Policy Change Events in `audit_logs`. | Review `policies` table for historical versions of a policy protocol. |
| **CC2.2** | **System Description** | The "Trust Center" provides an in-app description of system boundaries, data flows, and subprocessors. | `/dashboard/settings?tab=trust` UI component. | Navigate to Settings > Trust & Compliance to view current system architecture documentation. |

## CC6. Logical and Physical Access Controls

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **CC6.1** | **Logical Access Security** | Role-Based Access Control (RBAC) enforces `viewer`, `editor`, and `admin` permissions at the API route level. | API Response 403 (Forbidden) for unauthorized actions. | `verify-integrity.ts` script (Test 3: RBAC Enforcement). |
| **CC6.7** | **Data Transmission Security** | All data in transit is encrypted via TLS 1.3. API endpoints reject non-HTTPS connections (enforced by Vercel edge). | Network Inspection (Browser DevTools), SSL Labs Report. | Inspect connection security headers on any API request. |
| **CC6.8** | **Malicious Code Protection** | Input validation (Zod) prevents injection attacks. Content Security Policy (CSP) headers are configured. | `schema.ts` validation rules, Next.js headers config. | Attempt to submit non-compliant payloads to API endpoints; verify 400 Bad Request. |

## CC7. System Operations

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **CC7.2** | **Vulnerability Management** | Automated dependency scanning via `npm audit`. Regular updates to cryptographic libraries (`crypto`, `jose`). | `package-lock.json`, CI/CD build logs. | Run `npm audit` in codebase root. |
| **CC7.4** | **Incident Response** | Security incidents are logged as distinct event types in the immutable ledger. | `incidents` table, "Incident" type in `audit_logs`. | Trigger a mock incident via API; verify entry in `incidents` table and Reports UI. |

## CC8. Change Management

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **CC8.1** | **Authorization of Changes** | Application code changes are deployed via Vercel git integration with mandatory PR reviews (GitHub). Policies changes require `admin` role. | GitHub Pull Request history, `audit_logs` for policy changes. | Correlate git commit hash with deployment timestamp. Verify policy update requires admin token. |

## A1. Availability

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **A1.2** | **Environmental Protection** | Database hosted on Neon (PostgreSQL) with automated daily backups and point-in-time recovery. | Neon Console Backup Logs, `ops.md` retention policy. | Review `docs/ops.md` for backup configuration. |
| **A1.3** | **Recovery** | Infrastructure as Code (Next.js) allows rapid redeployment. Database replication handled by provider. | Vercel Deployment Logs. | Trigger redeployment via Vercel CLI or git push. |

## C1. Confidentiality

| SOC 2 ID | Control Description | AuditShield Implementation | Evidence Generated | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **C1.1** | **Data Classification** | Data is explicitly categorized. PII is minimized (only user IDs/emails from IdP). Content is treated as confidential. | `schema.ts` (DB Schema), Trust Center Data Collection section. | Review `docs/compliance/vendor_questionnaire.md` Section 2. |
| **C1.2** | **Data Disposal** | API keys can be rotated/revoked immediately. User deletion requests enforced via Clerk webhook. | `api_keys` table `revokedAt` timestamp. | Revoke API key in Settings; verify immediate rejection of subsequent requests. |

---

**Terminology Key**:
*   **Immutable Ledger**: The append-only `audit_logs` table protected by application-level logic preventing `DELETE` or `UPDATE` operations on committed rows.
*   **Tamper-Evident Hashing**: The cryptographic process using SHA-256 to generate a signature (`reportHash`) for every generated compliance report.

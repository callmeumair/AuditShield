# Enterprise Security Questionnaire: AuditShield

**Purpose**: This document provides standardized responses for Vendor Risk Assessment (VRA) and Security Questionnaires.
**Tone**: Factual, Precise, Conservative.
**Last Updated**: 2026-02-08

---

## 1. Company & Product Overview

*   **Product Name**: AuditShield
*   **Description**: A compliance orchestration platform that creates an immutable, tamper-evident ledger of AI usage policies and audit logs.
*   **Deployment Model**: SaaS (Multi-tenant)
*   **Primary Function**: To prove, via cryptographic evidence, that an organization's AI governance policies were in effect and followed at specific points in time.
*   **Out of Scope**: AuditShield does not perform real-time content filtering (DLP) or active blocking of network traffic. It acts as an oversight and attribution layer.

## 2. Data Collection & Handling

*   **Data Classification**:
    *   **Public**: Policy definitions (once published).
    *   **Internal**: User metadata (names, roles).
    *   **Confidential**: Audit logs, Incident reports, Generated Compliance PDFs.
*   **PII Collected**:
    *   User Name & Email (via Identity Provider).
    *   IP Address (for security logging only).
*   **Data NEVER Collected**:
    *   Credit Card Numbers (PCI data).
    *   Biometric Data.
    *   Raw passwords (handled solely by Identity Provider).
*   **Data Residency**: Data is stored in **US-East (N. Virginia)** region by default.
*   **Encryption**:
    *   **In-Transit**: TLS 1.3 (HTTPS) for all client-server communication.
    *   **At-Rest**: AES-256 encryption for database volumes (provider-managed).

## 3. Authentication & Access Control

*   **Identity Provider (IdP)**: Clerk (SOC 2 Type II certified).
*   **MFA**: Supported and enforced via IdP configuration.
*   **SSO**: SAML/OIDC supported via IdP Enterprise plans.
*   **Role-Based Access Control (RBAC)**:
    *   **Admin**: Full access to settings, policies, and user management.
    *   **Editor**: Can modify policies and generate reports.
    *   **Viewer**: Read-only access to reports and logs.
*   **Org Isolation**: Logical isolation enforced at the application layer via `org_id` WHERE clauses on all database queries.

## 4. Cryptography & Tamper Evidence

*   **Report Integrity**: All generated compliance reports are hashed using **SHA-256**.
*   **Verification Guarantee**:
    *   The hash is stored in the immutable database ledger immediately upon generation.
    *   Any modification to the PDF file (even one byte) will result in a mismatched SHA-256 hash during verification.
*   **Key Management**: API keys are generated using cryptographically secure random number generators (CSPRNG). Keys can be rotated immediately via the Settings dashboard.

## 5. Infrastructure & Hosting

*   **Cloud Provider**: Vercel (Frontend/Edge) & Neon (Database).
*   **Database**: PostgreSQL.
*   **CDN**: Vercel Edge Network.
*   **Environment Separation**: Production data is logically verified separate from Development/Staging environments.
*   **Secrets Management**: Environment variables are injected at runtime. Secrets are not committed to version control.

## 6. Logging & Monitoring

*   **Audit Logging**: All administrative actions (Policy Create/Update/Delete, User Role Changes, Report Generation) are logged to the `audit_logs` table.
*   **Immutability**: The application code does not expose endpoints to DELETE or UPDATE rows in the `audit_logs` table.
*   **Retention**:
    *   Audit Logs: 7 Years (default).
    *   Reports: Indefinite (content dependent on storage checks).
*   **Access**: Logs are viewable only by users with `Admin` or `Viewer` roles within the tenant.

## 7. Incident Response

*   **Detection**: Automated error tracking and anomaly detection via platform monitoring.
*   **Notification**: Status page updates and email notifications to Org Admins for critical security events.
*   **Audit Trail**: Incidents are recorded as distinct objects in the system, preserving a timeline of detection and resolution.

## 8. Customer Responsibilities

*   **Configuration**: Customers are responsible for defining their own AI usage policies. AuditShield records *that* a policy exists, but does not legally validate the policy's content.
*   **User Management**: Customers must deprovision users in their IdP (Clerk) when employees leave.
*   **Endpoint Security**: Customers are responsible for the security of the devices accessing the AuditShield dashboard.

---

**Contact**: security@auditshield.ai (Placeholder)

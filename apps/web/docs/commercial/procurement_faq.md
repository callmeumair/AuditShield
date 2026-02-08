# Enterprise Procurement FAQ

**Objection Handling for Security, Legal, and Risk Teams.**

---

### Data Collection & Privacy

**Q: What data does AuditShield specifically collect?**
**A:** AuditShield collects:
1.  **Identity Metadata**: User IDs and Emails provided by your Identity Provider (via Clerk).
2.  **Policy Definitions**: The rules you configure (e.g., "Ban usage of Model X").
3.  **Audit Logs**: Events confirming whether a specific user action occurred and whether it passed/failed your policy.
4.  **Verification Metadata**: Timestamps, Report Hashes, and Cryptographic Signatures.

**Q: What data does AuditShield explicitly NOT collect?**
**A:** We do not collect:
1.  **Model Inputs/Outputs**: We log *usage*, we do not store the full content prompt blobs unless explicitly configured for debugging (disabled by default).
2.  **Payment Information**: We rely on external invoicing; no credit card data hits our servers.
3.  **Biometrics or PII**: Beyond standard business email contact info.

### Architecture & Security

**Q: Where is customer data stored?**
**A:** Primary data storage is in **US-East (N. Virginia)** via our subprocessor, Neon (PostgreSQL). Backups and redundant storage may reside in other US regions.

**Q: How is customer data isolated?**
**A:** We utilize logical tenant isolation. Every database query includes a mandatory `org_id` filter appended at the ORM/Data Access Layer. This prevents cross-tenant data leakage.

**Q: How is access controlled?**
**A:** We support SAML and OIDC Single Sign-On (SSO) via Clerk. We enforce Role-Based Access Control (RBAC) with three tiers: Admin (Write/Delete), Editor (Write), and Viewer (Read-Only).

**Q: Does AuditShield have SOC 2 certification?**
**A:** AuditShield is **designed to support** SOC 2 Trust Services Criteria, specifically Common Criteria (CC) series. We do not currently hold an independent SOC 2 Type II attestation report.

### Operational Integrity

**Q: How does the "Tamper-Evident" feature work?**
**A:** When a compliance report is generated, we calculate a SHA-256 hash of the PDF content. This hash is immediately committed to our immutable database ledger. If a user tries to modify the PDF later, the hash will not match the ledger record, and verification will fail.

**Q: Can we independently verify reports?**
**A:** Yes. The verification logic is public. You can hash the PDF locally using `openssl` or any standard tool and compare it against the value stored in our ledger (visible in the dashboard or via API).

**Q: What happens if we cancel our subscription?**
**A:** You will have a 30-day grace period to export all audit logs (JSON/CSV) and generated reports (PDF). After this period, data is marked for deletion in accordance with our data retention schedule.

### Responsibilities

**Q: What are the customer's responsibilities?**
**A:**
1.  **Policy Definition**: You define what is "compliant." We just enforce and log it.
2.  **User Provisioning**: You must add/remove users from your Identity Provider.
3.  **Report Review**: You are responsible for reviewing the generated reports and providing them to your auditors.

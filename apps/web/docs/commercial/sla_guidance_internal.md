# Internal Guidance: Service Level Agreements (SLAs)

**For Internal Use Only.**
**Subject**: When and How to Offer SLAs.

---

### The Hard Rule
**Do NOT offer SLAs during a Pilot.**
A Pilot is a "Proof of Value" environment. We are arguably still configuring the tenant. Offering uptime guarantees ($$$ penalties) on a $2,500 engagement creates disproportionate liability vs. revenue.

### When to Introduce SLAs
1.  **Contracts > $25k ACV**: If a customer is paying the base $15k, they get "Reasonable Commercial Effort." If they negotiate above $25k, we can entertain specific uptime guarantees.
2.  **Mission Critical Usage**: Only if the customer is blocking *production* traffic based on our API response. (Note: We usually advise soft-fail open for this exact reason).
3.  **Legal Mandate**: If their procurement literally cannot sign without one.

### Standard SLA Terms (If forced)
*   **Target**: 99.9% Uptime (approx. 43 mins downtime/month allowed).
*   **Measurement Window**: Monthly.
*   **Exclusions** (Critical):
    *   Scheduled Maintenance (with 24h notice).
    *   Force Majeure (AWS/Vercel region outages).
    *   Customer Misconfiguration (e.g., they revoked their own API keys).
    *   Beta Features.
*   **Remedy**: Service Credits. Never cash refunds.
    *   < 99.9%: 5% Credit
    *   < 99.0%: 10% Credit
    *   < 95.0%: 25% Credit (Cap)

### Why We Are Conservative
We rely on third-party infrastructure (Vercel Edge, Neon Postgres). While they are highly reliable, we cannot technically guarantee 99.999% without a multi-region failover architecture which we have not yet fully implemented.
**Under-promise, Over-deliver.**

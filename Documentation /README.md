# AuditShield

AuditShield is an AI-usage compliance and audit platform. It helps organizations prove whether AI tools were used during a given time period and generates auditor-ready evidence.

## Architecture

- **Web**: Next.js 14, Tailwind, shadcn/ui.
- **Extension**: Chrome Manifest V3, React, Vite.
- **Database**: Neon (Serverless Postgres).
- **Auth**: Clerk.

## Getting Started

### Prerequisites
- Node.js 18+
- Neon Database URL
- Clerk API Keys

### Installation

1. Install dependencies:
   ```bash
   cd apps/web && npm install
   cd ../../apps/extension && npm install
   ```

2. Setup Environment:
   - Create `apps/web/.env.local` based on `.env.example`.

3. Run Development Server:
   ```bash
   # Web
   cd apps/web
   npm run dev
   ```

4. Build Extension:
   ```bash
   cd apps/extension
   npm run build
   # Load 'dist' folder in Chrome
   ```

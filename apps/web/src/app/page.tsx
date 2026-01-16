import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileText, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-16 flex items-center border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-semibold text-xl text-primary">
          <ShieldCheck className="h-6 w-6" />
          <span>AuditShield</span>
        </div>
        <nav className="ml-auto flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/sign-in" className="text-foreground hover:text-primary transition-colors">Log in</Link>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/sign-up">Start Free Trial</Link>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="py-24 px-6 md:px-12 text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Compliance for the AI Era
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Policies are not proof.
            <br />
            <span className="text-muted-foreground">AuditShield is.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate auditor-ready, tamper-evident records of every AI tool used across your organization.
            Prove compliance with zero friction.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base shadow-sm" asChild>
              <Link href="/dashboard">Generate Proof</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="#features">View Sample Report</Link>
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-secondary/30 border-y border-border">
          <div className="px-6 md:px-12 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Enterprise-Grade Compliance</h2>
              <p className="text-muted-foreground">
                Built for legal and security teams who need absolute certainty.
                AuditShield provides the evidence you need to pass audits and enforce policy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4 p-6 bg-card rounded-lg border border-border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Defensible Reports</h3>
                <p className="text-muted-foreground">
                  Export SHA-256 hashed PDF reports that stand up to scrutiny from auditors and legal teams.
                </p>
              </div>

              <div className="space-y-4 p-6 bg-card rounded-lg border border-border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Privacy First</h3>
                <p className="text-muted-foreground">
                  We track the <strong>domain</strong>, not the content. Your IP and sensitive prompts never leave your device.
                </p>
              </div>

              <div className="space-y-4 p-6 bg-card rounded-lg border border-border shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Continuous Monitoring</h3>
                <p className="text-muted-foreground">
                  Silent browser extension detects Shadow AI usage instantly and logs it to your secure dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Transparent Audit Pricing</h2>
            <p className="text-muted-foreground">
              Simple, seat-based pricing. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 rounded-lg border border-border bg-card shadow-sm flex flex-col">
              <h3 className="text-lg font-medium text-muted-foreground">Starter</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Perfect for individuals and freelancers proving compliance.</p>
              <ul className="mt-8 space-y-3 text-sm flex-1">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  1 User Seat
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  30 Days Audit Log Retention
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Basic PDF Export
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline" asChild>
                <Link href="/sign-up">Start Free Trial</Link>
              </Button>
            </div>

            {/* Pro - Highlighted */}
            <div className="p-8 rounded-lg border-2 border-primary bg-card shadow-md flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-medium text-primary">Professional</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">For agencies and small teams requiring auditor-ready proof.</p>
              <ul className="mt-8 space-y-3 text-sm flex-1">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Up to 10 Seats
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  1 Year Audit Log Retention
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <strong>SHA-256 Signed Reports</strong>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Priority Support
                </li>
              </ul>
              <Button className="mt-8 w-full" asChild>
                <Link href="/sign-up?plan=pro">Get Started</Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-lg border border-border bg-card shadow-sm flex flex-col">
              <h3 className="text-lg font-medium text-muted-foreground">Enterprise</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">For regulated industries and large organizations.</p>
              <ul className="mt-8 space-y-3 text-sm flex-1">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Unlimited Seats
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  7 Year Retention
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  SSO / SAML
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Custom MSA & SLA
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <ShieldCheck className="h-5 w-5" />
            AuditShield
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AuditShield Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

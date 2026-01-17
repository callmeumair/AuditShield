"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navigation() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isSignedIn } = useAuth();

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 h-20 flex items-center border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary blur-lg opacity-40 rounded-full group-hover:opacity-60 transition-opacity"></div>
                        <ShieldCheck className="h-7 w-7 text-primary relative z-10" />
                    </div>
                    <span>AuditShield</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`relative hover:text-foreground transition-colors ${pathname === link.href ? "text-foreground" : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    {isSignedIn ? (
                        <>
                            <Button asChild size="default" variant="outline" className="rounded-full px-6">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="text-sm font-medium hover:text-primary transition-colors">
                                Log in
                            </Link>
                            <Button asChild size="default" className="rounded-full px-6 shadow-primary/25 shadow-lg hover:shadow-primary/40 transition-all">
                                <Link href="/sign-up">Get Started</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/40 lg:hidden"
                >
                    <nav className="flex flex-col p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-lg font-medium hover:text-primary transition-colors ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-3 border-t border-border/40">
                            {isSignedIn ? (
                                <>
                                    <Button asChild size="default" className="w-full rounded-full">
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                    <div className="flex justify-center pt-2">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/sign-in" className="block text-center text-sm font-medium hover:text-primary transition-colors">
                                        Log in
                                    </Link>
                                    <Button asChild size="default" className="w-full rounded-full">
                                        <Link href="/sign-up">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

interface DemoContextType {
    isDemoMode: boolean;
}

const DemoContext = createContext<DemoContextType>({ isDemoMode: false });

export const useDemoMode = () => useContext(DemoContext);

export function DemoProvider({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        // Check for ?demo=true param
        if (searchParams?.get("demo") === "true") {
            setIsDemoMode(true);
            // Persist demo mode in session storage if needed, or just rely on URL
        }
    }, [searchParams]);

    return (
        <DemoContext.Provider value={{ isDemoMode }}>
            {isDemoMode && (
                <div className="bg-indigo-600 text-white px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 shadow-md z-[100] relative">
                    <AlertCircle className="h-4 w-4" />
                    <span>DEMO MODE — Data is mocked and read-only. Changes will not be saved.</span>
                </div>
            )}
            {children}
        </DemoContext.Provider>
    );
}

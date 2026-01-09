"use client";

import React, { createContext, useContext, useState } from "react";
import Userform from "@/components/header/_partials/Userform";

type AuthModalContextType = {
    openAuthModal: () => void;
    closeAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <AuthModalContext.Provider
            value={{
                openAuthModal: () => setOpen(true),
                closeAuthModal: () => setOpen(false),
            }}
        >
            {children}

            {/* 🔥 GLOBAL AUTH POPUP */}
            {open && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl w-full max-w-md relative">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-3 text-xl"
                        >
                            ×
                        </button>

                        <Userform onSuccess={() => setOpen(false)} />
                    </div>
                </div>
            )}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error("useAuthModal must be used inside AuthModalProvider");
    return ctx;
};

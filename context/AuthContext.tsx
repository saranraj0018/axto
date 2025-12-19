"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id?: number;
    name?: string;
    email?: string;
    phone?: number;
    image?: string;

};

type AuthContextType = {
    token: string | null;
    user: User | null;
    login: (token: string, user?: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    // 🔄 restore from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("auth_user");

        if (savedToken) setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const login = (token: string, user?: User) => {
        setToken(token);
        setUser(user || null);
        localStorage.setItem("auth_token", token);
        if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

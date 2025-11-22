'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'MANAGER' | 'STAFF';
}

interface AuthContextType {
    admin: Admin | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token on mount
        const storedToken = localStorage.getItem('admin_token');
        if (storedToken) {
            setToken(storedToken);
            fetchCurrentAdmin(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchCurrentAdmin = async (authToken: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/v1/admin/auth/me`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAdmin(data.data);
            } else {
                // Token is invalid, clear it
                localStorage.removeItem('admin_token');
                setToken(null);
            }
        } catch (error) {
            console.error('Failed to fetch admin:', error);
            localStorage.removeItem('admin_token');
            setToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const response = await fetch(`${apiUrl}/api/v1/admin/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        const data = await response.json();
        setToken(data.data.token);
        setAdmin(data.data.admin);
        localStorage.setItem('admin_token', data.data.token);
    };

    const logout = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem('admin_token');
    };

    return (
        <AuthContext.Provider value={{ admin, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
}

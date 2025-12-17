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
        // Check for existing admin data on mount
        const storedAdmin = localStorage.getItem('admin_data');
        if (storedAdmin) {
            const data = JSON.parse(storedAdmin);
            setAdmin(data.admin);
            setToken(data.token);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Simple login simulation - accept any email and password
        // In a real app, this would validate against a backend
        if (email && password) {
            const mockAdmin: Admin = {
                id: '1',
                email,
                name: email.split('@')[0],
                role: 'ADMIN'
            };
            const mockToken = 'mock_admin_token_' + Date.now();
            
            setAdmin(mockAdmin);
            setToken(mockToken);
            localStorage.setItem('admin_data', JSON.stringify({ admin: mockAdmin, token: mockToken }));
        } else {
            throw new Error('Please provide email and password');
        }
    };

    const logout = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem('admin_data');
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

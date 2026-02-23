import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

// If no supabase keys are provided, we will just simulate an auth state so the app doesn't break
const isMocked = !import.meta.env.VITE_SUPABASE_URL;

interface AuthContextType {
    session: Session | null;
    user: User | null;
    signOut: () => Promise<void>;
    // expose a mock sign-in for previewing Without API keys
    mockSignIn: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    signOut: async () => { },
    mockSignIn: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!isMocked) {
            supabase.auth.getSession().then(({ data: { session } }: any) => {
                setSession(session);
                setUser(session?.user ?? null);
            });

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
                setSession(session);
                setUser(session?.user ?? null);
            });

            return () => subscription.unsubscribe();
        }
    }, []);

    const signOut = async () => {
        if (!isMocked) {
            await supabase.auth.signOut();
        } else {
            setSession(null);
            setUser(null);
        }
    };

    const mockSignIn = (email: string) => {
        if (isMocked) {
            const mockUser = {
                id: 'mock-id-123',
                email: email,
                created_at: new Date().toISOString(),
                app_metadata: {},
                user_metadata: { name: email.split('@')[0] },
                aud: 'authenticated',
            } as User;
            setUser(mockUser);
            setSession({
                access_token: 'mock-token',
                refresh_token: 'mock-refresh',
                expires_in: 3600,
                token_type: 'bearer',
                user: mockUser
            } as Session);
        }
    }

    return (
        <AuthContext.Provider value={{ session, user, signOut, mockSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

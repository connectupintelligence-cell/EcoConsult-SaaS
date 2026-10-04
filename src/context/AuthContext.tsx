import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type PerfilAcesso = 'administradora' | 'executora' | 'cliente';

export interface Profile {
  id: string;
  full_name: string;
  role: PerfilAcesso;
  client_id: string | null;
}

interface AuthContextType {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  profileError: string | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Registra evento na trilha de auditoria (tabela audit_logs, imutável via RLS).
export async function registrarAuditoria(acao: string, modulo: string, detalhes = '', entidadeId?: string) {
  if (!supabase) return;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;
  await supabase.from('audit_logs').insert({
    user_id: data.user.id,
    action: acao,
    module: modulo,
    entity_id: entidadeId ?? null,
    details: detalhes
  });
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, client_id')
      .eq('id', userId)
      .maybeSingle();
    if (error) {
      setProfile(null);
      setProfileError(error.message);
    } else if (!data) {
      setProfile(null);
      setProfileError('Usuário autenticado, mas sem perfil de acesso cadastrado. Peça à administradora para liberar seu acesso.');
    } else {
      setProfile(data as Profile);
      setProfileError(null);
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session) await loadProfile(data.session.user.id);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        loadProfile(newSession.user.id);
      } else {
        setProfile(null);
        setProfileError(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    if (!supabase) return 'Supabase não configurado.';
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return error.message === 'Invalid login credentials' ? 'E-mail ou senha inválidos.' : error.message;
    }
    await registrarAuditoria('login', 'Autenticação', 'Login realizado');
    return null;
  };

  const signOut = async () => {
    if (!supabase) return;
    await registrarAuditoria('logout', 'Autenticação', 'Logout realizado');
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading, profileError, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Client, Proposal, Project, LicensingProcess, DocumentItem, Invoice, AuditLog } from '../types';

export class SupabaseService {
  /**
   * Testar conexão com o banco de dados Supabase
   */
  public static async checkConnection(): Promise<{ connected: boolean; message: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return {
        connected: false,
        message: 'Modo Simulação / Mock Ativo (VITE_SUPABASE_ANON_KEY pendente de preenchimento no .env).'
      };
    }

    try {
      const { data, error } = await supabase.from('tenants').select('count', { count: 'exact' });
      if (error) throw error;
      return {
        connected: true,
        message: 'Conectado com sucesso ao banco Supabase PostgreSQL!'
      };
    } catch (err: any) {
      return {
        connected: false,
        message: `Falha na conexão Supabase: ${err.message || 'Erro de rede'}`
      };
    }
  }

  /**
   * Buscar clientes do tenant ativo
   */
  public static async fetchClients(tenantId: string): Promise<Client[] | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data, error } = await supabase.from('clients').select('*').eq('tenant_id', tenantId);
    if (error) {
      console.error('[Supabase] Erro ao buscar clientes:', error);
      return null;
    }
    return data as Client[];
  }

  /**
   * Inserir novo log de auditoria no Supabase
   */
  public static async logAuditEvent(log: AuditLog): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) return false;
    const { error } = await supabase.from('audit_logs').insert([{
      id: log.id,
      tenant_id: log.tenantId,
      user_name: log.userName,
      action: log.action,
      module: log.module,
      timestamp: log.timestamp,
      is_ai_action: log.isAiAction,
      details: log.details
    }]);
    return !error;
  }
}

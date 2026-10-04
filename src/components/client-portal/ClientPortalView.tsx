import React, { useEffect, useState } from 'react';
import { Building2, Loader2, FileText, MessageSquarePlus, Award } from 'lucide-react';
import { DeadlineBadge } from '../common/DeadlineBadge';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface ClienteRow {
  id: string;
  nome: string;
  tipo_documento: 'CPF' | 'CNPJ';
  documento: string;
  cidade: string | null;
  uf: string | null;
}

import { useApp } from '../../context/AppContext';

// Portal do cliente: os dados vêm do Supabase e a RLS garante que
// o cliente só consegue ler o registro vinculado ao seu próprio perfil.
export const ClientPortalView: React.FC = () => {
  const { profile } = useAuth();
  const { documents, toggleDocumentStatus, licenses } = useApp();
  const [clientes, setClientes] = useState<ClienteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('clients')
      .select('id, nome, tipo_documento, documento, cidade, uf')
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setClientes((data as ClienteRow[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Portal do Cliente</h1>
        <p className="text-sm text-slate-400">Olá, {profile?.full_name}. Aqui você acompanha seus serviços e documentos liberados.</p>
      </div>

      {loading && <Loader2 className="w-5 h-5 animate-spin text-brand-400" />}
      {error && <div className="text-sm text-red-300">Erro ao carregar dados: {error}</div>}

      {!loading && !error && clientes.length === 0 && (
        <div className="text-sm text-slate-400 bg-eco-surface border border-eco-border rounded-xl p-4">
          Nenhuma empresa ou pessoa vinculada ao seu acesso ainda.
        </div>
      )}

      {clientes.map((c) => (
        <div key={c.id} className="bg-eco-surface border border-eco-border rounded-xl p-5">
          <div className="flex items-center space-x-2 text-white font-semibold">
            <Building2 className="w-4 h-4 text-brand-400" />
            <span>{c.nome}</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {c.tipo_documento}: {c.documento} {c.cidade ? `· ${c.cidade}/${c.uf}` : ''}
          </div>
        </div>
      ))}

      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-brand-400" />
          <span>Documentos e Estudos Liberados</span>
        </h2>
        {documents.length === 0 ? (
          <div className="text-sm text-slate-400 bg-eco-surface border border-eco-border rounded-xl p-4">
            Você não possui nenhum documento liberado no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="bg-eco-surface border border-eco-border rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{doc.title}</h3>
                  <p className="text-xs text-slate-400">{doc.category}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  {doc.isValidado ? (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">✔ Validado por você</span>
                  ) : (
                    <button
                      onClick={() => toggleDocumentStatus(doc.id, 'is_validado', true)}
                      className="text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white px-3 py-1.5 rounded-lg transition"
                    >
                      Validar Documento
                    </button>
                  )}
                  <button 
                    onClick={async () => {
                      if (!supabase) return;
                      const { data, error } = await supabase.storage.from('documentos').download(doc.versions[0]?.fileName);
                      if (data) {
                        const url = window.URL.createObjectURL(data);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = doc.title;
                        a.click();
                      }
                    }}
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-brand-400" />
          <span>Meus Processos e Licenças</span>
        </h2>
        {licenses.length === 0 ? (
          <div className="text-sm text-slate-400 bg-eco-surface border border-eco-border rounded-xl p-4">
            Nenhum processo ambiental registrado em andamento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {licenses.map(lic => (
              <div key={lic.id} className="bg-eco-surface border border-eco-border rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{lic.licenseType} - {lic.environmentalOrgan}</h3>
                  <p className="text-xs text-slate-400">Processo: {lic.processNumber}</p>
                </div>
                <div className="mt-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                    lic.status === 'deferido' ? 'bg-emerald-950 text-emerald-400' :
                    lic.status === 'pendencia' ? 'bg-red-950 text-red-400' :
                    'bg-blue-950 text-blue-400'
                  }`}>
                    {lic.status}
                  </span>
                </div>
                {lic.conditions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-eco-border space-y-2">
                    <span className="text-[10px] font-semibold text-slate-400">Próximos Prazos / Condicionantes:</span>
                    {lic.conditions.map(cond => (
                      <div key={cond.id} className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 line-clamp-1 flex-1 pr-2">{cond.title}</span>
                        <DeadlineBadge deadlineDate={cond.deadlineDate} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-eco-surface border border-eco-border rounded-xl p-5 opacity-70">
          <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm"><MessageSquarePlus className="w-4 h-4" /><span>Abrir demanda</span></div>
          <p className="text-xs text-slate-400 mt-2">Em desenvolvimento (módulo 2 do PRD).</p>
        </div>
      </div>
    </div>
  );
};

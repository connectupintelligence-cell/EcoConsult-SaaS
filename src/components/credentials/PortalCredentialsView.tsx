import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PortalCredential } from '../../types';
import { 
  KeyRound, ShieldCheck, Eye, EyeOff, Plus, Building2, UserCheck, Lock, Copy, Check 
} from 'lucide-react';

export const PortalCredentialsView: React.FC = () => {
  const { clients, portalCredentials, addPortalCredential, addAuditLog } = useApp();

  const [selectedSystem, setSelectedSystem] = useState<string>('TODOS');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Credential State
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [systemName, setSystemName] = useState<PortalCredential['systemName']>('Sistema MTR');
  const [loginUser, setLoginUser] = useState('');
  const [cpfName, setCpfName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  const filteredCreds = selectedSystem === 'TODOS'
    ? portalCredentials
    : portalCredentials.filter(c => c.systemName === selectedSystem);

  const togglePasswordVisibility = (cred: PortalCredential) => {
    const nextState = !visiblePasswords[cred.id];
    setVisiblePasswords(prev => ({ ...prev, [cred.id]: nextState }));

    if (nextState) {
      addAuditLog(
        `Visualização de Senha: ${cred.systemName}`,
        'Portais & Credenciais',
        false,
        `Usuário exibiu credencial de ${cred.loginCnpjOrUser}`
      );
    }
  };

  const handleCopyPassword = (cred: PortalCredential) => {
    const rawPass = cred.encryptedPassword?.replace('•••••••• (', '').replace(')', '') || '';
    navigator.clipboard.writeText(rawPass);
    setCopiedId(cred.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser) return;

    addPortalCredential({
      clientId,
      systemName,
      loginCnpjOrUser: loginUser,
      cpfNameUser: cpfName || undefined,
      emailContact: email || undefined,
      encryptedPassword: `•••••••• (${password})`,
      notes: notes || undefined
    });

    setShowAddModal(false);
    setLoginUser('');
    setPassword('');
    setCpfName('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-eco-card via-eco-surface to-eco-card p-6 rounded-2xl border border-eco-border shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <KeyRound className="w-5.5 h-5.5 text-amber-400" />
            <span>Portais & Credenciais de Acesso a Órgãos Ambientais</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cofre seguro para gerenciamento de logins de operadoras (IBAMA, MTR, SINIR, Polícia Federal) por cliente.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Credencial de Portal</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-eco-surface border border-eco-border p-3 rounded-xl shadow-sm text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-semibold">Filtrar por Sistema:</span>
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="bg-eco-dark border border-eco-border rounded-lg px-3 py-1.5 text-white font-semibold focus:outline-none"
          >
            <option value="TODOS">Todos os Sistemas ({portalCredentials.length})</option>
            <option value="IBAMA">IBAMA (CTF)</option>
            <option value="Sistema MTR">Sistema MTR (Resíduos)</option>
            <option value="Sistema SINIR">Sistema SINIR</option>
            <option value="Polícia Federal">Polícia Federal (CLF)</option>
          </select>
        </div>

        <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Acessos registrados e auditados pela consultora Cristiane Beatriz Pereira</span>
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCreds.map(cred => {
          const client = clients.find(c => c.id === cred.clientId);
          const isPassVisible = visiblePasswords[cred.id];

          return (
            <div key={cred.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 inline-block">
                    {cred.systemName}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5">{client?.name || 'Cliente'}</h3>
                  <span className="text-xs text-slate-400">CNPJ do Cliente: <strong className="text-slate-200 font-mono">{cred.loginCnpjOrUser}</strong></span>
                </div>

                <div className="w-8 h-8 rounded-lg bg-eco-dark border border-eco-border flex items-center justify-center text-amber-400">
                  <KeyRound className="w-4 h-4" />
                </div>
              </div>

              {/* User / Operator Details */}
              <div className="bg-eco-dark/70 border border-eco-border p-3 rounded-lg space-y-2 text-xs">
                {cred.cpfNameUser && (
                  <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-brand-400" />
                    <span>{cred.cpfNameUser}</span>
                  </div>
                )}

                {cred.emailContact && (
                  <div className="text-slate-400 text-[11px]">
                    E-mail: <span className="text-slate-300 font-mono">{cred.emailContact}</span>
                  </div>
                )}

                {/* Password Line */}
                <div className="flex items-center justify-between pt-1 border-t border-eco-border/50">
                  <div className="font-mono text-slate-300 text-xs">
                    Senha: <strong className="text-amber-300">{isPassVisible ? (cred.encryptedPassword?.replace('•••••••• (', '').replace(')', '') || '****') : '••••••••'}</strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePasswordVisibility(cred)}
                      className="p-1.5 bg-eco-card border border-eco-border hover:border-brand-500 rounded text-slate-300 hover:text-white transition"
                      title={isPassVisible ? 'Ocultar Senha' : 'Mostrar Senha'}
                    >
                      {isPassVisible ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleCopyPassword(cred)}
                      className="p-1.5 bg-eco-card border border-eco-border hover:border-brand-500 rounded text-slate-300 hover:text-white transition"
                      title="Copiar Senha"
                    >
                      {copiedId === cred.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {cred.notes && (
                <p className="text-[11px] text-slate-400 italic bg-eco-card/40 p-2 rounded border border-eco-border/40">
                  {cred.notes}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD CREDENTIAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddCredential} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <span>Cadastrar Acesso a Portal Ambiental</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cliente Vinculado</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sistema Ambiental</label>
                <select
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value as any)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  <option value="Sistema MTR">Sistema MTR (Resíduos)</option>
                  <option value="IBAMA">IBAMA (CTF)</option>
                  <option value="Sistema SINIR">Sistema SINIR</option>
                  <option value="Polícia Federal">Polícia Federal (CLF)</option>
                  <option value="FEAM SEI">FEAM SEI MG</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Login / CNPJ da Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 09625967000214"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">CPF & Nome do Operador / Usuário</label>
                <input
                  type="text"
                  placeholder="Ex: CPF: 143.588.216.42 - Bárbara Oliveira"
                  value={cpfName}
                  onChange={(e) => setCpfName(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Senha de Acesso</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-mail Cadastrado</label>
                  <input
                    type="email"
                    placeholder="ehs@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Observações do Acesso</label>
                <input
                  type="text"
                  placeholder="Ex: Responsável EHS autorizada no sistema"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow">
                Salvar Credencial
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

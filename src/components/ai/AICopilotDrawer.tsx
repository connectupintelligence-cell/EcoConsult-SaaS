import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Bot, User, X, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const { currentTenant, projects, licenses } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Olá! Sou o Assistente IA da ${currentTenant.name}. Posso ajudar a consultar o status de licenças (IBAMA, CETESB, SEMAD), prazos de condicionantes ou gerar resumos técnicos de projetos. Como posso ajudar?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // AI Response simulation scoped to current tenant
    setTimeout(() => {
      let replyText = `Estou analisando a base de dados exclusiva do tenant ${currentTenant.name}...`;

      const lower = userMsg.text.toLowerCase();
      if (lower.includes('prazo') || lower.includes('vencer') || lower.includes('licença')) {
        replyText = `Existem ${licenses.length} processos ambientais monitorados. Destaque para a Licença da CETESB com condicionante de efluentes vencendo nos próximos dias. Lembre-se: qualquer protocolo no órgão requer aprovação humana prévia.`;
      } else if (lower.includes('projeto') || lower.includes('status')) {
        replyText = `Atualmente há ${projects.length} projetos em andamento na ${currentTenant.name}. Os moldes de PGRS e Licenciamento de Instalação estão orientando os entregáveis.`;
      } else {
        replyText = `Compreendido. Com base nos dados do tenant ${currentTenant.name}, posso estruturar este relatório seguindo o template cadastrado ou verificar o histórico no repositório de documentos.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-eco-surface border-l border-eco-border shadow-2xl z-50 flex flex-col">
      {/* Drawer Header */}
      <div className="p-4 border-b border-eco-border flex items-center justify-between bg-gradient-to-r from-eco-surface to-eco-card">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Copiloto IA EcoConsult</h3>
            <span className="text-[10px] text-slate-400 font-mono">Escopo: {currentTenant.name}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-sm">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-2 text-[10px] text-amber-300 flex items-center space-x-2">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
        <span>Respostas restritas aos dados do seu tenant. A IA nunca envia protocolos ou documentos sozinha.</span>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex space-x-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-6 h-6 rounded bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`p-3 rounded-xl max-w-[80%] space-y-1 ${
              msg.sender === 'user'
                ? 'bg-brand-600 text-white rounded-br-none'
                : 'bg-eco-card border border-eco-border text-slate-200 rounded-bl-none'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <span className="text-[9px] opacity-60 block text-right font-mono">{msg.timestamp}</span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-eco-border bg-eco-dark/60 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Pergunte sobre licenças, prazos ou projetos..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-eco-surface border border-eco-border rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
        />
        <button
          type="submit"
          className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-lg transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

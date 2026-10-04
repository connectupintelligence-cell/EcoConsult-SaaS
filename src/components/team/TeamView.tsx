import React from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_USERS } from '../../services/mockData';
import { Users, Clock, CheckCircle2, UserCheck, Shield } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { currentTenant, projects } = useApp();

  const tenantMembers = INITIAL_USERS.filter(u => u.tenantId === currentTenant.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-400" />
          <span>Gestão de Equipe & Alocação de Horas</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitoramento de produtividade técnica e distribuição de projetos por responsável.
        </p>
      </div>

      {/* Team Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tenantMembers.map(member => {
          const assignedProjects = projects.filter(p => p.responsibleUserId === member.id);
          const totalSteps = assignedProjects.flatMap(p => p.steps);
          const completedSteps = totalSteps.filter(s => s.completed).length;

          return (
            <div key={member.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-brand-500 object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white">{member.name}</h3>
                  <div className="text-xs text-slate-400">{member.email}</div>
                  <span className="text-[10px] font-mono text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800 uppercase mt-1 inline-block">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="bg-eco-dark/60 p-3 rounded-lg border border-eco-border space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Projetos Liderados:</span>
                  <span className="font-bold text-white">{assignedProjects.length}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Etapas Concluídas:</span>
                  <span className="font-bold text-emerald-400">{completedSteps} / {totalSteps.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

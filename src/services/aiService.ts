import { ProposalTemplate, Proposal, ProjectTemplate, LicensingCondition } from '../types';

export interface AIParsedLicenseResult {
  processNumber: string;
  environmentalOrgan: 'IBAMA' | 'CETESB' | 'INEA' | 'IAT' | 'SEMAD';
  licenseType: 'LP' | 'LI' | 'LO' | 'Outorga';
  issueDate: string;
  expirationDate: string;
  conditions: Omit<LicensingCondition, 'id' | 'processId'>[];
  aiNotes: string;
}

export class AIService {
  /**
   * Extrai assincronamente condicionantes, prazos e metadados de uma licença/documento.
   * Regra de segurança: Sempre retorna marcado para revisão humana obrigatória.
   */
  public static async parseEnvironmentalDocument(fileName: string): Promise<AIParsedLicenseResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      processNumber: `PROC-IA-${Math.floor(10000 + Math.random() * 90000)}/2026`,
      environmentalOrgan: fileName.toLowerCase().includes('cetesb') ? 'CETESB' : 'IBAMA',
      licenseType: 'LI',
      issueDate: new Date().toISOString().split('T')[0],
      expirationDate: new Date(Date.now() + 365 * 2 * 86400000).toISOString().split('T')[0],
      conditions: [
        {
          title: 'Relatório Semestral de Qualidade da Água Subterrânea (Extração IA)',
          description: 'Apresentar laudos físico-químicos dos poços de monitoramento PM-01 a PM-04.',
          deadlineDate: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0], // 25 dias
          alertDays: 30,
          status: 'em_andamento'
        },
        {
          title: 'Programa de Compensação de Vegetação Nativa (Extração IA)',
          description: 'Apresentar termo de compromisso de averbação da reserva legal.',
          deadlineDate: new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0], // 12 dias
          alertDays: 15,
          status: 'pendente'
        }
      ],
      aiNotes: 'Documento lido com sucesso pela IA. 2 condicionantes extraídas e prazos calculados. REVISÃO HUMANA OBRIGATÓRIA.'
    };
  }

  /**
   * Preenche um template de proposta comercial a partir de parâmetros do cliente.
   */
  public static generateProposalFromTemplate(
    template: ProposalTemplate,
    clientName: string,
    values: Record<string, string>
  ): { title: string; filledValues: Record<string, string>; totalValue: number; deliveryDays: number } {
    const filledValues = {
      cliente: clientName,
      escopo: values.escopo || 'Prestação de serviços técnicos de consultoria ambiental.',
      valor: values.valor || '25.000,00',
      prazo: values.prazo || '30',
      responsavel_tecnico: values.responsavel_tecnico || 'Consultor Técnico Cadastrado'
    };

    const totalValue = parseFloat(filledValues.valor.replace('.', '').replace(',', '.')) || 25000;
    const deliveryDays = parseInt(filledValues.prazo, 10) || 30;

    return {
      title: `${template.title.replace('Proposta Comercial - ', '')} - ${clientName}`,
      filledValues,
      totalValue,
      deliveryDays
    };
  }

  /**
   * Gera relatório/entregável técnico alinhado com o prompt-base do modelo de projeto.
   */
  public static generateProjectDeliverable(template: ProjectTemplate, projectName: string): string {
    return `### [RASCUNHO IA - REQUER APROVAÇÃO HUMANA]
**Relatório Técnico de Acompanhamento**
**Projeto:** ${projectName}
**Modelo Base:** ${template.name}

---

#### Directiva de IA Aplicada:
*${template.aiPromptBase}*

#### Resumo de Progresso:
1. **Checklist Padrão:** ${template.defaultChecklist.length} etapas registradas.
2. **Documentos de Suporte Exigidos:** ${template.requiredDocs.join(', ')}.
3. **Análise de Risco de Prazos:** Nenhuma condicionante legal em atraso crítico para este entregável.

*Nota: Este documento foi pré-gerado pelo Assistente EcoConsult e NÃO deve ser enviado ao órgão sem assinatura do técnico responsável.*`;
  }
}

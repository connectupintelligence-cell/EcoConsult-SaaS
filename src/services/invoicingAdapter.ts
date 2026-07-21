import { Invoice } from '../types';

export type InvoicingProviderType = 'FocusNFe' | 'PlugNotas' | 'eNotas' | 'EmissorMunicipal';

export interface InvoicingProviderConfig {
  provider: InvoicingProviderType;
  apiKey: string;
  environment: 'homologation' | 'production';
  municipalCode?: string;
}

export interface EmitInvoiceResult {
  success: boolean;
  fiscalRef: string;
  xmlMock: string;
  pdfUrlMock: string;
  errorMessage?: string;
}

export class InvoicingAdapterService {
  private config: InvoicingProviderConfig;

  constructor(config: InvoicingProviderConfig) {
    this.config = config;
  }

  public async emitInvoice(invoice: Invoice): Promise<EmitInvoiceResult> {
    // Simula comunicação via Adapter Pattern com o provedor cadastrado
    console.log(`[InvoicingAdapter] Emitindo NF via ${this.config.provider}...`, invoice);

    await new Promise(resolve => setTimeout(resolve, 1200));

    if (this.config.environment === 'homologation' && Math.random() < 0.05) {
      return {
        success: false,
        fiscalRef: '',
        xmlMock: '',
        pdfUrlMock: '',
        errorMessage: 'Erro 403: Inscrição Municipal do tomador não cadastrada no portal SEFIN.'
      };
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const fiscalRef = `NFS-e nº 000${randomNum} - Auth: ${this.config.provider.toUpperCase()}-${Math.hex(10000 + randomNum)}`;

    const xmlMock = `<?xml version="1.0" encoding="UTF-8"?>
<NFSeProvider name="${this.config.provider}">
  <Identificacao>
    <Numero>${randomNum}</Numero>
    <Serie>1</Serie>
    <DataEmissao>${new Date().toISOString()}</DataEmissao>
    <Status>EMITIDA_SUCESSO</Status>
  </Identificacao>
  <Prestador>
    <CNPJ>${invoice.tenantId === 'tenant-1' ? '12.345.678/0001-90' : '98.765.432/0001-10'}</CNPJ>
  </Prestador>
  <Valores>
    <ValorServicos>${invoice.amount.toFixed(2)}</ValorServicos>
    <Aliquota>2.00</Aliquota>
    <ValorISS>${(invoice.amount * 0.02).toFixed(2)}</ValorISS>
  </Valores>
</NFSeProvider>`;

    return {
      success: true,
      fiscalRef,
      xmlMock,
      pdfUrlMock: `https://eco-consult-saas.local/invoices/pdf-mock-${randomNum}.pdf`
    };
  }

  public getProviderInfo(): InvoicingProviderConfig {
    return this.config;
  }
}

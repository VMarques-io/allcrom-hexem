export const SEGMENTOS = [
  { value: 'todos', label: 'Todos' },
  { value: 'cromatografia', label: 'Cromatografia' },
  { value: 'saude', label: 'Saúde' },
  { value: 'biotecnologia', label: 'Biotecnologia' },
] as const;

export const MARCAS_REPRESENTADAS = [
  { value: 'phenomenex', label: 'Phenomenex', segmento: 'cromatografia' },
  { value: 'gilson', label: 'Gilson', segmento: 'cromatografia' },
  { value: 'hamilton', label: 'Hamilton', segmento: 'cromatografia' },
  { value: 'raytor', label: 'Raytor', segmento: 'cromatografia' },
  { value: 'tasso', label: 'Tasso', segmento: 'saude' },
  { value: 'mitra', label: 'Mitra', segmento: 'saude' },
  { value: 'qtek', label: 'QTEK', segmento: 'cromatografia' },
  { value: 'rephile', label: 'Rephile', segmento: 'cromatografia' },
  { value: 'meling', label: 'Meling', segmento: 'biotecnologia' },
  { value: 'scilogex', label: 'Scilogex', segmento: 'biotecnologia' },
  { value: 'herolab', label: 'Herolab', segmento: 'cromatografia' },
  { value: 'hirschmann', label: 'Hirschmann', segmento: 'cromatografia' },
  { value: 'krackeler', label: 'Krackeler', segmento: 'cromatografia' },
  { value: 'camag', label: 'CAMAG', segmento: 'cromatografia' },
  { value: 'restek', label: 'Restek', segmento: 'cromatografia' },
  { value: 'sartorius', label: 'Sartorius', segmento: 'biotecnologia' },
  { value: 'medclub', label: 'MedClub', segmento: 'saude' },
] as const;

export const STATUS_COTACAO = [
  { value: 'rascunho', label: 'Rascunho', cor: 'gray' },
  { value: 'enviada', label: 'Enviada', cor: 'blue' },
  { value: 'em_analise', label: 'Em Análise', cor: 'yellow' },
  { value: 'aprovada', label: 'Aprovada', cor: 'green' },
  { value: 'rejeitada', label: 'Rejeitada', cor: 'red' },
  { value: 'expirada', label: 'Expirada', cor: 'orange' },
] as const;

export const STATUS_OS = [
  { value: 'aberta', label: 'Aberta', cor: 'blue' },
  { value: 'em_andamento', label: 'Em Andamento', cor: 'yellow' },
  { value: 'aguardando_pecas', label: 'Aguardando Peças', cor: 'orange' },
  { value: 'aguardando_aprovacao', label: 'Aguardando Aprovação', cor: 'purple' },
  { value: 'concluida', label: 'Concluída', cor: 'green' },
  { value: 'cancelada', label: 'Cancelada', cor: 'red' },
] as const;

export const PRIORIDADES = [
  { value: 'baixa', label: 'Baixa', cor: 'gray' },
  { value: 'media', label: 'Média', cor: 'blue' },
  { value: 'alta', label: 'Alta', cor: 'orange' },
  { value: 'critica', label: 'Crítica', cor: 'red' },
] as const;

export const TIPOS_OS = [
  { value: 'instalacao', label: 'Instalação' },
  { value: 'manutencao_preventiva', label: 'Manutenção Preventiva' },
  { value: 'manutencao_corretiva', label: 'Manutenção Corretiva' },
  { value: 'calibracao', label: 'Calibração' },
  { value: 'qualificacao', label: 'Qualificação' },
  { value: 'treinamento', label: 'Treinamento' },
  { value: 'suporte_tecnico', label: 'Suporte Técnico' },
] as const;

export const CATEGORIAS_PRODUTO = [
  { value: 'colunas_hplc', label: 'Colunas HPLC' },
  { value: 'colunas_gc', label: 'Colunas GC' },
  { value: 'colunas_spe', label: 'Colunas SPE' },
  { value: 'equipamentos_cromatografia', label: 'Equipamentos de Cromatografia' },
  { value: 'pipetas', label: 'Pipetas' },
  { value: 'seringas', label: 'Seringas' },
  { value: 'dissolutores', label: 'Dissolutores' },
  { value: 'dispositivos_coleta', label: 'Dispositivos de Coleta' },
  { value: 'purificadores_agua', label: 'Purificadores de Água' },
  { value: 'centrifugas', label: 'Centrífugas' },
  { value: 'freezers', label: 'Freezers' },
  { value: 'espectrometros', label: 'Espectrômetros' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'consumiveis', label: 'Consumíveis' },
  { value: 'software', label: 'Software' },
] as const;

export const STATUS_PEDIDO = [
  { value: 'pendente', label: 'Pendente', cor: 'gray' },
  { value: 'confirmado', label: 'Confirmado', cor: 'blue' },
  { value: 'em_producao', label: 'Em Produção', cor: 'yellow' },
  { value: 'expedido', label: 'Expedido', cor: 'purple' },
  { value: 'em_transito', label: 'Em Trânsito', cor: 'orange' },
  { value: 'entregue', label: 'Entregue', cor: 'green' },
  { value: 'cancelado', label: 'Cancelado', cor: 'red' },
] as const;

export const TIPOS_INTERACAO = [
  { value: 'ligacao', label: 'Ligação' },
  { value: 'email', label: 'E-mail' },
  { value: 'visita', label: 'Visita' },
  { value: 'reuniao_online', label: 'Reunião Online' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'proposta_enviada', label: 'Proposta Enviada' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'suporte', label: 'Suporte' },
] as const;

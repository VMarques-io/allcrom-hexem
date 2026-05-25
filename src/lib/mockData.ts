export const faturamentoMensal = [
  { mes: 'Jan', valor: 1423000 },
  { mes: 'Fev', valor: 1387000 },
  { mes: 'Mar', valor: 1565000 },
  { mes: 'Abr', valor: 1612000 },
  { mes: 'Mai', valor: 1534000 },
  { mes: 'Jun', valor: 1698000 },
  { mes: 'Jul', valor: 1721000 },
  { mes: 'Ago', valor: 1643000 },
  { mes: 'Set', valor: 1756000 },
  { mes: 'Out', valor: 1812000 },
  { mes: 'Nov', valor: 1847320 },
  { mes: 'Dez', valor: 0 },
];

export const pedidosPorSegmento = [
  { nome: 'Farmacêutico', valor: 38 },
  { nome: 'Biotecnológico', valor: 22 },
  { nome: 'Químico', valor: 18 },
  { nome: 'Alimentos', valor: 12 },
  { nome: 'Análises Clínicas', valor: 7 },
  { nome: 'Outros', valor: 3 },
];

export const topProdutos = [
  { descricao: 'Coluna Luna C18 5µm 250x4.6mm', quantidade: 87, faturamento: 156600 },
  { descricao: 'Coluna Kinetex C18 2.6µm 100x4.6mm', quantidade: 74, faturamento: 140600 },
  { descricao: 'Pipeta P1000 Gilson Pipetman', quantidade: 62, faturamento: 93000 },
  { descricao: 'Seringa Hamilton 100µL', quantidade: 58, faturamento: 34800 },
  { descricao: 'Purificador de Água Rephile Roz 100', quantidade: 45, faturamento: 225000 },
  { descricao: 'Centrífuga Scilogex D2012 Plus', quantidade: 41, faturamento: 328000 },
  { descricao: 'Freezer -86°C Meling DW-HL388', quantidade: 38, faturamento: 494000 },
  { descricao: 'Coluna Zebron ZB-5 30m 0.25mm', quantidade: 35, faturamento: 38500 },
  { descricao: 'Dissolutor Raytor RT6', quantidade: 32, faturamento: 480000 },
  { descricao: 'Espectrômetro CAMAG TLC Scanner', quantidade: 28, faturamento: 560000 },
];

export const statusOS = [
  { nome: 'Aberta', valor: 12 },
  { nome: 'Em Andamento', valor: 14 },
  { nome: 'Aguardando Peça', valor: 5 },
  { nome: 'Concluída', valor: 43 },
];

export const ultimosPedidos = [
  { id: 'PED-2024-0847', cliente: 'Farmácias Magnum', valor: 28450, status: 'entregue', data: '2024-11-18' },
  { id: 'PED-2024-0846', cliente: 'BioGen Biotecnologia', valor: 156200, status: 'em_transito', data: '2024-11-17' },
  { id: 'PED-2024-0845', cliente: 'Química Analítica Ltda', valor: 42300, status: 'confirmado', data: '2024-11-17' },
  { id: 'PED-2024-0844', cliente: 'Alimentos Bom Sabor', valor: 18700, status: 'expedido', data: '2024-11-16' },
  { id: 'PED-2024-0843', cliente: 'LabCrom Análises', valor: 95600, status: 'pendente', data: '2024-11-16' },
];

export const osProximasPrazo = [
  { id: 'OS-2024-0312', equipamento: 'HPLC Agilent 1260', cliente: 'Farmácias Magnum', prazo: '2024-11-20', prioridade: 'critica' },
  { id: 'OS-2024-0310', equipamento: 'Dissolutor Raytor RT6', cliente: 'BioGen Biotecnologia', prazo: '2024-11-21', prioridade: 'alta' },
  { id: 'OS-2024-0308', equipamento: 'Purificador Rephile', cliente: 'Química Analítica Ltda', prazo: '2024-11-22', prioridade: 'alta' },
  { id: 'OS-2024-0305', equipamento: 'Centrífuga Scilogex', cliente: 'LabCrom Análises', prazo: '2024-11-23', prioridade: 'media' },
  { id: 'OS-2024-0301', equipamento: 'GC Shimadzu 2030', cliente: 'Alimentos Bom Sabor', prazo: '2024-11-25', prioridade: 'baixa' },
];

export const alertasSistema = [
  { tipo: 'estoque' as const, descricao: 'Coluna Luna C18 abaixo do mínimo (3 un.)', tempo: '5 min' },
  { tipo: 'os' as const, descricao: 'OS-2024-0312 sem atualização há 48h', tempo: '12 min' },
  { tipo: 'financeiro' as const, descricao: '3 faturas vencem nos próximos 3 dias', tempo: '1h' },
  { tipo: 'estoque' as const, descricao: 'Pipeta P1000 Gilson sem estoque', tempo: '2h' },
  { tipo: 'os' as const, descricao: 'Peça importada ETA 15 dias para OS-0308', tempo: '3h' },
];

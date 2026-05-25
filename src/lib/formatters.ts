export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(data: string | Date): string {
  return new Date(data).toLocaleDateString('pt-BR');
}

export function formatarCNPJ(cnpj: string): string {
  const clean = cnpj.replace(/\D/g, '');
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

export function formatarPorcentagem(valor: number): string {
  return `${valor.toFixed(1)}%`;
}

export function formatarTelefone(tel: string): string {
  const clean = tel.replace(/\D/g, '');
  if (clean.length === 11) return clean.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  return clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}

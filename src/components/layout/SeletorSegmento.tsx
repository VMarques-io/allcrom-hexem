import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSegmento } from '@/contexts/SegmentoContext';

const OPCOES = [
  { value: 'todos', label: 'Todos os Segmentos' },
  { value: 'cromatografia', label: 'Cromatografia' },
  { value: 'saude', label: 'Saúde' },
  { value: 'biotecnologia', label: 'Biotecnologia' },
] as const;

export function SeletorSegmento() {
  const { segmento, setSegmento } = useSegmento();

  return (
    <Select value={segmento} onValueChange={setSegmento}>
      <SelectTrigger className="w-[180px] h-9 text-sm">
        <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPCOES.map((opcao) => (
          <SelectItem key={opcao.value} value={opcao.value}>
            {opcao.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

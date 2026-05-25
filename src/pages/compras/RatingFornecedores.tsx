import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MARCAS_REPRESENTADAS } from '@/lib/constants';
import { formatarPorcentagem } from '@/lib/formatters';

interface FornecedorRating {
  marca: string;
  segmento: string;
  rating: number;
  totalAvaliacoes: number;
  leadTimeMedio: number;
  conformidade: number;
}

const MOCK_RATINGS: FornecedorRating[] = [
  { marca: 'Phenomenex', segmento: 'cromatografia', rating: 4.8, totalAvaliacoes: 45, leadTimeMedio: 18, conformidade: 97.5 },
  { marca: 'Gilson', segmento: 'cromatografia', rating: 4.5, totalAvaliacoes: 32, leadTimeMedio: 22, conformidade: 94.2 },
  { marca: 'Hamilton', segmento: 'cromatografia', rating: 4.7, totalAvaliacoes: 28, leadTimeMedio: 15, conformidade: 98.1 },
  { marca: 'Raytor', segmento: 'cromatografia', rating: 4.9, totalAvaliacoes: 18, leadTimeMedio: 12, conformidade: 99.0 },
  { marca: 'Tasso', segmento: 'saude', rating: 4.6, totalAvaliacoes: 22, leadTimeMedio: 10, conformidade: 96.8 },
  { marca: 'Mitra', segmento: 'saude', rating: 4.3, totalAvaliacoes: 15, leadTimeMedio: 14, conformidade: 93.5 },
  { marca: 'QTEK', segmento: 'cromatografia', rating: 4.4, totalAvaliacoes: 20, leadTimeMedio: 20, conformidade: 95.0 },
  { marca: 'Rephile', segmento: 'cromatografia', rating: 4.2, totalAvaliacoes: 12, leadTimeMedio: 25, conformidade: 91.8 },
  { marca: 'Meling', segmento: 'biotecnologia', rating: 4.0, totalAvaliacoes: 8, leadTimeMedio: 30, conformidade: 90.5 },
  { marca: 'Scilogex', segmento: 'biotecnologia', rating: 3.9, totalAvaliacoes: 10, leadTimeMedio: 28, conformidade: 89.0 },
  { marca: 'Restek', segmento: 'cromatografia', rating: 4.6, totalAvaliacoes: 25, leadTimeMedio: 16, conformidade: 96.0 },
  { marca: 'Sartorius', segmento: 'biotecnologia', rating: 4.7, totalAvaliacoes: 30, leadTimeMedio: 14, conformidade: 98.5 },
  { marca: 'CAMAG', segmento: 'cromatografia', rating: 4.5, totalAvaliacoes: 14, leadTimeMedio: 20, conformidade: 95.5 },
  { marca: 'MedClub', segmento: 'saude', rating: 4.1, totalAvaliacoes: 6, leadTimeMedio: 18, conformidade: 92.0 },
];

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : star - 0.5 <= rating
              ? 'fill-amber-200 text-amber-400'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

function ConformidadeBadge({ value }: { value: number }) {
  const className =
    value >= 97
      ? 'bg-green-100 text-green-800 border-green-200'
      : value >= 93
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-red-100 text-red-800 border-red-200';
  return (
    <Badge variant="outline" className={className}>
      {formatarPorcentagem(value)}
    </Badge>
  );
}

export default function RatingFornecedores() {
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<FornecedorRating | null>(null);
  const [novaAvaliacao, setNovaAvaliacao] = useState(0);
  const [comentario, setComentario] = useState('');

  const handleOpenDialog = (f: FornecedorRating) => {
    setFornecedorSelecionado(f);
    setNovaAvaliacao(0);
    setComentario('');
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rating de Fornecedores</h1>
        <p className="text-muted-foreground">Avaliação e desempenho dos fornecedores</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Total Avaliações</TableHead>
              <TableHead>Lead Time Médio</TableHead>
              <TableHead>Conformidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_RATINGS.map((f) => (
              <TableRow
                key={f.marca}
                className="cursor-pointer"
                onClick={() => handleOpenDialog(f)}
              >
                <TableCell className="font-medium">{f.marca}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {f.segmento}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StarRating rating={f.rating} />
                </TableCell>
                <TableCell>{f.totalAvaliacoes}</TableCell>
                <TableCell>{f.leadTimeMedio} dias</TableCell>
                <TableCell>
                  <ConformidadeBadge value={f.conformidade} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDialog(f);
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!fornecedorSelecionado} onOpenChange={(open) => !open && setFornecedorSelecionado(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Avaliação - {fornecedorSelecionado?.marca}</DialogTitle>
            <DialogDescription>
              Detalhes da avaliação do fornecedor e opção de nova avaliação
            </DialogDescription>
          </DialogHeader>

          {fornecedorSelecionado && (
            <div className="space-y-4">
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating Atual</span>
                  <StarRating rating={fornecedorSelecionado.rating} size="lg" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Avaliações</span>
                  <span className="text-sm font-medium">{fornecedorSelecionado.totalAvaliacoes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lead Time Médio</span>
                  <span className="text-sm font-medium">{fornecedorSelecionado.leadTimeMedio} dias</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conformidade</span>
                  <ConformidadeBadge value={fornecedorSelecionado.conformidade} />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Sua Avaliação</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNovaAvaliacao(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= novaAvaliacao
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 hover:text-amber-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>

                <Label>Comentário</Label>
                <Input
                  placeholder="Deixe seu comentário..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                />

                <Button
                  className="w-full"
                  disabled={novaAvaliacao === 0}
                  onClick={() => setFornecedorSelecionado(null)}
                >
                  Enviar Avaliação
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

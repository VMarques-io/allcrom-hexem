import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Representada {
  id: string;
  nome: string;
  pais: string;
  rating: number;
  totalProdutos: number;
  exclusiva: boolean;
  segmento: string;
}

const MOCK_REPRESENTADAS: Representada[] = [
  { id: '1', nome: 'Phenomenex', pais: 'EUA', rating: 4.9, totalProdutos: 4500, exclusiva: true, segmento: 'Cromatografia' },
  { id: '2', nome: 'Gilson', pais: 'França', rating: 4.5, totalProdutos: 800, exclusiva: false, segmento: 'Cromatografia' },
  { id: '3', nome: 'Hamilton', pais: 'Suíça', rating: 4.7, totalProdutos: 600, exclusiva: false, segmento: 'Cromatografia' },
  { id: '4', nome: 'Raytor', pais: 'Brasil', rating: 4.8, totalProdutos: 150, exclusiva: false, segmento: 'Cromatografia' },
  { id: '5', nome: 'Tasso', pais: 'EUA', rating: 4.6, totalProdutos: 50, exclusiva: false, segmento: 'Saúde' },
  { id: '6', nome: 'Mitra', pais: 'EUA', rating: 4.4, totalProdutos: 120, exclusiva: false, segmento: 'Saúde' },
  { id: '7', nome: 'QTEK', pais: 'Brasil', rating: 4.3, totalProdutos: 200, exclusiva: false, segmento: 'Cromatografia' },
  { id: '8', nome: 'Rephile', pais: 'China', rating: 4.5, totalProdutos: 180, exclusiva: false, segmento: 'Cromatografia' },
  { id: '9', nome: 'Meling', pais: 'China', rating: 4.2, totalProdutos: 100, exclusiva: false, segmento: 'Biotecnologia' },
  { id: '10', nome: 'Scilogex', pais: 'EUA', rating: 4.4, totalProdutos: 250, exclusiva: false, segmento: 'Biotecnologia' },
  { id: '11', nome: 'Herolab', pais: 'Alemanha', rating: 4.1, totalProdutos: 90, exclusiva: false, segmento: 'Cromatografia' },
  { id: '12', nome: 'Hirschmann', pais: 'Alemanha', rating: 4.3, totalProdutos: 300, exclusiva: false, segmento: 'Cromatografia' },
  { id: '13', nome: 'Krackeler', pais: 'EUA', rating: 4.0, totalProdutos: 500, exclusiva: false, segmento: 'Cromatografia' },
  { id: '14', nome: 'CAMAG', pais: 'Suíça', rating: 4.8, totalProdutos: 75, exclusiva: false, segmento: 'Cromatografia' },
  { id: '15', nome: 'Restek', pais: 'EUA', rating: 4.6, totalProdutos: 5000, exclusiva: false, segmento: 'Cromatografia' },
  { id: '16', nome: 'Sartorius', pais: 'Alemanha', rating: 4.7, totalProdutos: 3000, exclusiva: false, segmento: 'Biotecnologia' },
  { id: '17', nome: 'MedClub', pais: 'Brasil', rating: 4.2, totalProdutos: 400, exclusiva: false, segmento: 'Saúde' },
];

export default function Representadas() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Representadas</h1>
        <p className="text-muted-foreground">17 marcas parceiras</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {MOCK_REPRESENTADAS.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold shrink-0">
                  {r.nome.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-lg truncate">{r.nome}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{r.pais}</Badge>
                    {r.exclusiva && (
                      <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                        Exclusiva
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(r.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">{r.rating}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                {r.totalProdutos.toLocaleString('pt-BR')} produtos
              </p>

              <Button variant="outline" size="sm" className="w-full">
                Ver Produtos
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
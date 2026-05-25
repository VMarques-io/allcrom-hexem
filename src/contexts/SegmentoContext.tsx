import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Segmento = 'todos' | 'cromatografia' | 'saude' | 'biotecnologia';

interface SegmentoContextType {
  segmento: Segmento;
  setSegmento: (segmento: Segmento) => void;
}

const SegmentoContext = createContext<SegmentoContextType | undefined>(undefined);

const STORAGE_KEY = 'allcrom_segmento';

export function SegmentoProvider({ children }: { children: ReactNode }) {
  const [segmento, setSegmentoState] = useState<Segmento>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['todos', 'cromatografia', 'saude', 'biotecnologia'].includes(stored)) {
        return stored as Segmento;
      }
    } catch {}
    return 'todos';
  });

  const setSegmento = (novoSegmento: Segmento) => {
    setSegmentoState(novoSegmento);
    try {
      localStorage.setItem(STORAGE_KEY, novoSegmento);
    } catch {}
  };

  return (
    <SegmentoContext.Provider value={{ segmento, setSegmento }}>
      {children}
    </SegmentoContext.Provider>
  );
}

export function useSegmento(): SegmentoContextType {
  const context = useContext(SegmentoContext);
  if (!context) {
    throw new Error('useSegmento deve ser usado dentro de SegmentoProvider');
  }
  return context;
}

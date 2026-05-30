import { useState, useCallback } from 'react';
import type { Hero, PaginatedResponse } from '../types/hero';
import { heroService } from '../services/api';

export function useHeroes() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHeroes = useCallback(async (p = 1, search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data }: { data: PaginatedResponse } = await heroService.list(p, search);
      setHeroes(data.data);
      setTotal(data.total);
      setPage(p);
    } catch {
      setError('Erro ao carregar heróis');
    } finally {
      setLoading(false);
    }
  }, []);

  return { heroes, total, page, loading, error, fetchHeroes, setPage };
}
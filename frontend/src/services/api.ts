import axios from 'axios';
import type { CreateHeroDto, Hero, PaginatedResponse, UpdateHeroDto } from '../types/hero';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export const heroService = {
  list: (page: number, search?: string) =>
    api.get<PaginatedResponse>('/heroes', {
      params: { page, limit: 10, search: search || undefined },
    }),

  getOne: (id: string) =>
    api.get<Hero>(`/heroes/${id}`),

  create: (data: CreateHeroDto) =>
    api.post<Hero>('/heroes', data),

  update: (id: string, data: UpdateHeroDto) =>
    api.put<Hero>(`/heroes/${id}`, data),

  remove: (id: string) =>
    api.delete(`/heroes/${id}`),

  toggle: (id: string) =>
    api.patch<Hero>(`/heroes/${id}/toggle`),
};
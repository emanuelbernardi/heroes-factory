import { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import type { Hero, CreateHeroDto } from '../types/hero';
import { heroService } from '../services/api';
import { useHeroes } from '../hooks/useHeroes';
import { HeroCard } from '../components/HeroCard/HeroCard';
import { HeroFormModal } from '../components/HeroFormModal/HeroFormModal';
import { HeroDetailModal } from '../components/HeroDetailModal/HeroDetailModal';
import { ConfirmModal } from '../components/ConfirmModal/ConfirmModal';
import { Pagination } from '../components/Pagination/Pagination';

type Toast = { message: string; type: 'success' | 'error' };

export function HeroesPage() {
  const { heroes, total, page, loading, fetchHeroes } = useHeroes();
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Estados dos modais
  const [formOpen, setFormOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | null>(null);
  const [viewingHero, setViewingHero] = useState<Hero | null>(null);
  const [deletingHero, setDeletingHero] = useState<Hero | null>(null);
  const [activatingHero, setActivatingHero] = useState<Hero | null>(null);
  const [deactivatingHero, setDeactivatingHero] = useState<Hero | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchHeroes(1);
  }, []);

  const handleSearch = useCallback(() => {
    fetchHeroes(1, search);
  }, [search, fetchHeroes]);

  const handleCreate = async (data: CreateHeroDto) => {
    setActionLoading(true);
    try {
      await heroService.create(data);
      setFormOpen(false);
      fetchHeroes(1, search);
      showToast('Herói criado com sucesso!', 'success');
    } catch {
      showToast('Erro ao criar herói.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data: CreateHeroDto) => {
    if (!editingHero) return;
    setActionLoading(true);
    try {
      await heroService.update(editingHero.id, data);
      setEditingHero(null);
      fetchHeroes(page, search);
      showToast('Herói atualizado com sucesso!', 'success');
    } catch {
      showToast('Erro ao atualizar herói.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingHero) return;
    setActionLoading(true);
    try {
      await heroService.remove(deletingHero.id);
      setDeletingHero(null);
      fetchHeroes(page, search);
      showToast('Herói excluído com sucesso!', 'success');
    } catch {
      showToast('Erro ao excluir herói.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleActivate = async () => {
    if (!activatingHero) return;
    setActionLoading(true);
    try {
      await heroService.toggle(activatingHero.id);
      setActivatingHero(null);
      fetchHeroes(page, search);
      showToast('Herói ativado com sucesso!', 'success');
    } catch {
      showToast('Erro ao ativar herói.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!deactivatingHero) return;
    setActionLoading(true);
    try {
      await heroService.toggle(deactivatingHero.id);
      setDeactivatingHero(null);
      fetchHeroes(page, search);
      showToast('Herói desativado com sucesso!', 'success');
    } catch {
      showToast('Erro ao desativar herói.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] px-8 py-10">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Título */}
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
        Heróis
      </h1>

      {/* Barra de ações */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setFormOpen(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
        >
          Criar
        </button>

        <div className="flex flex-1 items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200 gap-2">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Digite o nome do herói"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />
        </div>

        <button
          onClick={handleSearch}
          className="px-5 py-2 border border-gray-300 rounded-full text-sm text-gray-600 bg-white hover:bg-gray-50 transition"
        >
          Buscar
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <>
          {heroes.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-lg">
              Nenhum herói encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {heroes.map(hero => (
                <HeroCard
                  key={hero.id}
                  hero={hero}
                  onView={setViewingHero}
                  onEdit={setEditingHero}
                  onDelete={setDeletingHero}
                  onActivate={setActivatingHero}
                  onDeactivate={setDeactivatingHero}
                />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            total={total}
            limit={10}
            onChange={p => fetchHeroes(p, search)}
          />
        </>
      )}

      {/* Modal — Criar */}
      <HeroFormModal
        isOpen={formOpen}
        loading={actionLoading}
        onSave={handleCreate}
        onClose={() => setFormOpen(false)}
      />

      {/* Modal — Editar */}
      <HeroFormModal
        isOpen={!!editingHero}
        hero={editingHero}
        loading={actionLoading}
        onSave={handleUpdate}
        onClose={() => setEditingHero(null)}
      />

      {/* Modal — Visualizar */}
      <HeroDetailModal
        isOpen={!!viewingHero}
        hero={viewingHero}
        onClose={() => setViewingHero(null)}
      />

      {/* Modal — Confirmar exclusão */}
      <ConfirmModal
        isOpen={!!deletingHero}
        title="Excluir herói"
        message={`Tem certeza que deseja excluir "${deletingHero?.nickname}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        loading={actionLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeletingHero(null)}
      />

      {/* Modal — Confirmar desativação */}
      <ConfirmModal
        isOpen={!!deactivatingHero}
        title="Desativar herói"
        message={`Tem certeza que deseja desativar "${deactivatingHero?.nickname}"?`}
        confirmLabel="Desativar"
        loading={actionLoading}
        onConfirm={handleDeactivate}
        onCancel={() => setDeactivatingHero(null)}
      />

      {/* Modal — Confirmar ativação */}
      <ConfirmModal
        isOpen={!!activatingHero}
        title="Ativar herói"
        message={`Deseja reativar "${activatingHero?.nickname}"?`}
        confirmLabel="Ativar"
        loading={actionLoading}
        onConfirm={handleActivate}
        onCancel={() => setActivatingHero(null)}
      />
    </div>
  );
}
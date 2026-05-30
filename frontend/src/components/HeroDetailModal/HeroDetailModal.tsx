import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import type { Hero } from '../../types/hero';

interface Props {
  hero: Hero | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HeroDetailModal({ hero, isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {hero?.nickname}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
              {hero?.avatar_url ? (
                <img
                  src={hero.avatar_url}
                  alt={hero.nickname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🦸
                </div>
              )}
            </div>
          </div>

          {/* Dados */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Nome completo:</p>
              <p className="text-gray-500">{hero?.name || '—'}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Data de nascimento</p>
              <p className="text-gray-500">
                {hero?.date_of_birth
                  ? new Date(hero.date_of_birth).toLocaleDateString('pt-BR')
                  : '—'}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Universo</p>
              <p className="text-gray-500">{hero?.universe || '—'}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Habilidade</p>
              <p className="text-gray-500">{hero?.main_power || '—'}</p>
            </div>
          </div>

          {/* Botão fechar */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm hover:bg-gray-50"
            >
              Fechar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
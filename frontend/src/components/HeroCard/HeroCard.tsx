import { useState } from 'react';
import { MoreVertical, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import type { Hero } from '../../types/hero';

interface Props {
  hero: Hero;
  onView: (hero: Hero) => void;
  onEdit: (hero: Hero) => void;
  onDelete: (hero: Hero) => void;
  onActivate: (hero: Hero) => void;
  onDeactivate: (hero: Hero) => void;
}

export function HeroCard({ hero, onView, onEdit, onDelete, onActivate, onDeactivate }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-3 transition-all
        ${!hero.is_active ? 'opacity-50 grayscale' : 'hover:shadow-md'}`}
    >
      {/* Menu ⋮ */}
      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          className="p-1 rounded-full hover:bg-gray-100 transition"
        >
          <MoreVertical size={18} className="text-gray-400" />
        </button>

        {menuOpen && (
          <>
            {/* Overlay para fechar ao clicar fora */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />

            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 flex flex-col py-1 min-w-[130px]">

              {/* Editar — desabilitado se inativo */}
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onEdit(hero); }}
                disabled={!hero.is_active}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Pencil size={14} /> Editar
              </button>

              {hero.is_active ? (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDelete(hero); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    <Trash2 size={14} /> Excluir
                  </button>

                  {/* Toggle LIGADO — azul */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onDeactivate(hero); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:bg-gray-50"
                  >
                    <ToggleRight size={18} /> Desativar
                  </button>
                </>
              ) : (
                /* Toggle DESLIGADO — cinza */
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onActivate(hero); }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:bg-gray-50"
                >
                  <ToggleLeft size={18} /> Ativar
                </button>
              )}

            </div>
          </>
        )}
      </div>

      {/* Avatar */}
      <div
        onClick={() => onView(hero)}
        className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 cursor-pointer"
      >
        {hero.avatar_url ? (
          <img
            src={hero.avatar_url}
            alt={hero.nickname}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            🦸
          </div>
        )}
      </div>

      {/* Nome */}
      <p
        onClick={() => onView(hero)}
        className="font-semibold text-gray-800 text-center cursor-pointer"
      >
        {hero.nickname}
      </p>
    </div>
  );
}
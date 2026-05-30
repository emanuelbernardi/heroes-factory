import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import type { Hero, CreateHeroDto } from '../../types/hero';

interface Props {
  isOpen: boolean;
  hero?: Hero | null;
  loading?: boolean;
  onSave: (data: CreateHeroDto) => void;
  onClose: () => void;
}

const EMPTY_FORM: CreateHeroDto = {
  name: '',
  nickname: '',
  date_of_birth: '',
  universe: '',
  main_power: '',
  avatar_url: '',
};

export function HeroFormModal({ isOpen, hero, loading, onSave, onClose }: Props) {
  const [form, setForm] = useState<CreateHeroDto>(EMPTY_FORM);

  useEffect(() => {
    if (hero) {
      setForm({
        name: hero.name || '',
        nickname: hero.nickname || '',
        date_of_birth: hero.date_of_birth
          ? hero.date_of_birth.split('T')[0]
          : '',
        universe: hero.universe || '',
        main_power: hero.main_power || '',
        avatar_url: hero.avatar_url || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [hero, isOpen]);

  const handleChange = (field: keyof CreateHeroDto, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.nickname) {
      alert('Nome completo e Nome de guerra são obrigatórios');
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              {hero ? 'Editar herói' : 'Criar herói'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Campos */}
          <div className="flex flex-col gap-4">
            <Field label="Nome completo" required>
              <input
                type="text"
                placeholder="Digite o nome completo"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Nome de guerra" required>
              <input
                type="text"
                placeholder="Digite o nome de guerra"
                value={form.nickname}
                onChange={e => handleChange('nickname', e.target.value)}
                className="input"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Data de nascimento">
                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={e => handleChange('date_of_birth', e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Universo">
                <input
                  type="text"
                  placeholder="Digite o universo"
                  value={form.universe}
                  onChange={e => handleChange('universe', e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Habilidade">
                <input
                  type="text"
                  placeholder="Digite a habilidade"
                  value={form.main_power}
                  onChange={e => handleChange('main_power', e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Avatar (URL)">
                <input
                  type="text"
                  placeholder="Digite a URL"
                  value={form.avatar_url}
                  onChange={e => handleChange('avatar_url', e.target.value)}
                  className="input"
                />
              </Field>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm hover:bg-gray-50 disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function Field({
  label, required, children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
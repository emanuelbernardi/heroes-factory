interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, total, limit, onChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 mt-6">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition
            ${p === page
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 text-gray-500 hover:bg-gray-100'
            }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition"
      >
        ›
      </button>
    </div>
  );
}
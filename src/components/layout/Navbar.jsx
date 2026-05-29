import { useCartStore } from '../../store/useCartStore.js';
import clientData from '../../data/client.json';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

export default function Navbar() {
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-5 py-4"
      style={{ backgroundColor: 'var(--color-brand-black)', borderBottom: '1px solid color-mix(in srgb, var(--color-brand-accent) 30%, transparent)' }}
    >
      <div className="flex flex-col leading-none">
        <span
          className="font-light tracking-[0.18em] uppercase"
          style={{ ...SERIF, fontSize: '1.15rem', color: '#FFFFFF' }}
        >
          {clientData.name}
        </span>
        {clientData.instagram && (
          <a
            href={`https://instagram.com/${clientData.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] tracking-[0.22em] uppercase"
            style={{ color: 'var(--color-brand-muted)', ...SERIF, fontStyle: 'italic', textDecoration: 'none' }}
          >
            @{clientData.instagram}
          </a>
        )}
      </div>

      <button
        onClick={toggleCart}
        className="relative flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase font-bold transition-colors hover:bg-white hover:text-black"
        style={{ border: '1px solid color-mix(in srgb, var(--color-brand-accent) 60%, transparent)', color: '#FFFFFF' }}
        aria-label="Abrir carrito"
      >
        Carrito
        {totalItems > 0 && (
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
          >
            {totalItems}
          </span>
        )}
      </button>
    </header>
  );
}

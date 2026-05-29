import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard.jsx';
import menu from '../../data/menu.json';

const ALL = 'Todo';
const categories = [ALL, ...Array.from(new Set(menu.map((p) => p.category)))];
const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

export default function MenuSection() {
  const [active, setActive] = useState(ALL);
  const filtered = active === ALL ? menu : menu.filter((p) => p.category === active);

  return (
    <section
      id="tienda"
      className="px-4 py-14"
      style={{ backgroundColor: 'var(--color-brand-cream)', position: 'relative', zIndex: 10 }}
    >
      <div className="flex flex-col items-center gap-2 mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
          tienda verde
        </span>
        <h2
          className="font-normal"
          style={{ ...SERIF, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--color-brand-black)' }}
        >
          Souvenirs & Creaciones
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px w-12" style={{ backgroundColor: '#C8D8C8' }} />
          <span style={{ color: 'var(--color-brand-accent)', fontSize: '10px' }}>🌿</span>
          <div className="h-px w-12" style={{ backgroundColor: '#C8D8C8' }} />
        </div>
        <p className="text-sm text-center mt-2 max-w-md leading-relaxed" style={{ color: '#4A6155' }}>
          Cada producto es hecho a mano con amor y conciencia ambiental. Los talleres se reservan por persona.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-1.5 text-[10px] tracking-widest uppercase font-bold transition-colors"
            style={
              active === cat
                ? { backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }
                : { backgroundColor: 'transparent', color: '#9A9A9A', border: '1px solid #C8D8C8' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className="grid gap-4 max-w-4xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

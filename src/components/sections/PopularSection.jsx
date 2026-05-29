import { AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore.js';
import ProductCard from '../ui/ProductCard.jsx';
import menu from '../../data/menu.json';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };
const popularItems = menu.filter(p => p.popular);

export default function PopularSection() {
  const orderCounts = useCartStore(s => s.orderCounts);

  const userFavorites = Object.entries(orderCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => menu.find(p => p.id === parseInt(id, 10)))
    .filter(Boolean);

  const isPersonalized = userFavorites.length >= 3;
  const hasCompanyPopular = popularItems.length > 0;

  if (!isPersonalized && !hasCompanyPopular) return null;

  const items = isPersonalized ? userFavorites.slice(0, 4) : popularItems;

  return (
    <section className="px-4 py-10" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EBEBEB' }}>
      <div className="flex flex-col items-center gap-2 mb-8">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
          {isPersonalized ? 'tus favoritos' : 'más encargados'}
        </span>
        <h2 className="font-normal" style={{ ...SERIF, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--color-brand-black)' }}>
          {isPersonalized ? 'Repite tus favoritos' : 'Los más elegidos'}
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px w-10" style={{ backgroundColor: '#EBEBEB' }} />
          <span style={{ color: 'var(--color-brand-accent)', fontSize: '10px' }}>✿</span>
          <div className="h-px w-10" style={{ backgroundColor: '#EBEBEB' }} />
        </div>
      </div>
      <div
        className="grid gap-4 max-w-4xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        <AnimatePresence>
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

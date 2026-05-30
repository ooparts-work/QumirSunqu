import { useCartStore } from '../../store/useCartStore.js';
import ProductCard from '../ui/ProductCard.jsx';
import menu from '../../data/menu.json';
import clientData from '../../data/client.json';

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

  if (clientData.popularSection === 0) return null;
  if (!isPersonalized && !hasCompanyPopular) return null;

  const items = isPersonalized ? userFavorites.slice(0, 6) : popularItems;

  return (
    <section className="py-12" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #EBEBEB' }}>
      <div className="flex flex-col items-center gap-2 mb-8 px-4">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
          {isPersonalized ? 'tus favoritos' : 'más encargados'}
        </span>
        <h2 className="font-normal" style={{ ...SERIF, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--color-brand-black)' }}>
          {isPersonalized ? 'Repite tus favoritos' : 'Los más elegidos'}
        </h2>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px w-10" style={{ backgroundColor: '#EBEBEB' }} />
          <span style={{ color: 'var(--color-brand-accent)', fontSize: '10px' }}>✿</span>
          <div className="h-px w-10" style={{ backgroundColor: '#EBEBEB' }} />
        </div>
      </div>
      <div
        className="no-scrollbar overflow-x-auto max-w-4xl mx-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-4 px-4" style={{ width: 'max-content', minWidth: '100%' }}>
          {items.map(product => (
            <div key={product.id} style={{ width: '200px', flexShrink: 0 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

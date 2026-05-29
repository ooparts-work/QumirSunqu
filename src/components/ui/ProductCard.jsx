import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore.js';
import clientData from '../../data/client.json';

const currency = clientData.currency ?? '$';
const modalEnabled = clientData.productModal === 1;
const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

function WaIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductCard({ product }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const buildShareUrl = useCartStore((s) => s.buildShareUrl);
  const openProduct = useCartStore((s) => s.openProduct);

  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.qty ?? 0;

  const handleShare = (e) => {
    e.stopPropagation();
    window.open(buildShareUrl(product), '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(13,13,13,0.09)' }}
      transition={{ duration: 0.22 }}
      className={`flex flex-col bg-white${modalEnabled ? ' cursor-pointer' : ''}`}
      style={{ border: '1px solid #E8E8E8', boxShadow: '0 1px 4px rgba(13,13,13,0.04)' }}
      onClick={() => modalEnabled && openProduct(product)}
    >
      <div
        className="relative flex items-center justify-center text-4xl"
        style={{ height: '110px', backgroundColor: 'var(--color-brand-cream)', borderBottom: '1px solid #F0F0F0' }}
      >
        {product.emoji}
        <button
          onClick={handleShare}
          title="Compartir"
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#25D366', color: 'white' }}
        >
          <WaIcon />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-1 px-3 pt-3 pb-1">
        <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
          {product.category}
        </span>
        <h3 className="font-normal leading-snug" style={{ ...SERIF, fontSize: '1.05rem', color: 'var(--color-brand-black)' }}>
          {product.name}
        </h3>
        <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: '#9A9A9A' }}>
          {product.description}
        </p>
      </div>

      <div
        className="flex items-center justify-between px-3 py-3 mt-1"
        style={{ borderTop: '1px solid #F0F0F0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-light" style={{ ...SERIF, fontSize: '1.1rem', color: 'var(--color-brand-black)', letterSpacing: '0.02em' }}>
          {currency}{product.price.toFixed(2)}
        </span>
        {qty === 0 ? (
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => addItem(product)}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 font-bold"
            style={{ backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }}
          >
            Agregar
          </motion.button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(product.id, -1)}
              className="w-6 h-6 flex items-center justify-center font-bold text-sm"
              style={{ border: '1px solid #E8E8E8', color: 'var(--color-brand-black)', backgroundColor: 'white' }}
            >
              −
            </button>
            <span className="font-black text-sm w-4 text-center" style={{ color: 'var(--color-brand-black)' }}>{qty}</span>
            <button
              onClick={() => updateQty(product.id, 1)}
              className="w-6 h-6 flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

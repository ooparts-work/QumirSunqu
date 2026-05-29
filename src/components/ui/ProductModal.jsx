import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore.js';
import clientData from '../../data/client.json';

const currency = clientData.currency ?? '$';
const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

function WaIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductModal() {
  const product = useCartStore((s) => s.viewProduct);
  const closeProduct = useCartStore((s) => s.closeProduct);
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const buildShareUrl = useCartStore((s) => s.buildShareUrl);

  const cartItem = product ? items.find((i) => i.id === product.id) : null;
  const qty = cartItem?.qty ?? 0;

  const handleShare = () => window.open(buildShareUrl(product), '_blank');

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProduct}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-black) 65%, transparent)', backdropFilter: 'blur(6px)' }}
          />
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-sm pointer-events-auto flex flex-col"
              style={{ backgroundColor: '#FFFFFF', maxHeight: '90vh' }}
            >
              <button
                onClick={closeProduct}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-xs font-black transition-opacity hover:opacity-60"
                style={{ backgroundColor: 'var(--color-brand-cream)', color: 'var(--color-brand-black)' }}
              >
                ✕
              </button>

              <div
                className="flex items-center justify-center text-7xl shrink-0"
                style={{ height: '160px', backgroundColor: 'var(--color-brand-cream)', borderBottom: '1px solid #F0F0F0' }}
              >
                {product.emoji}
              </div>

              <div className="overflow-y-auto px-6 py-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
                    {product.category}
                  </span>
                  <h2 className="font-normal leading-tight" style={{ ...SERIF, fontSize: '1.8rem', color: 'var(--color-brand-black)' }}>
                    {product.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ backgroundColor: '#F0F0F0' }} />
                  <span style={{ color: 'var(--color-brand-accent)', fontSize: '10px' }}>✿</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: '#F0F0F0' }} />
                </div>

                <p className="text-sm leading-relaxed" style={{ color: '#6A6A6A' }}>{product.description}</p>

                <p className="font-light" style={{ ...SERIF, fontSize: '1.6rem', color: 'var(--color-brand-black)', letterSpacing: '0.02em' }}>
                  {currency}{product.price.toFixed(2)}
                </p>

                {qty === 0 ? (
                  <button
                    onClick={() => { addItem(product); closeProduct(); }}
                    className="w-full py-3.5 font-black text-xs tracking-widest uppercase transition-opacity hover:opacity-85"
                    style={{ backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }}
                  >
                    Agregar al pedido
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 flex-1 justify-center py-2" style={{ border: '1px solid #EBEBEB' }}>
                      <button
                        onClick={() => updateQty(product.id, -1)}
                        className="w-8 h-8 font-black text-base flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-brand-cream)', color: 'var(--color-brand-black)' }}
                      >−</button>
                      <span className="font-black text-lg w-6 text-center" style={{ color: 'var(--color-brand-black)' }}>{qty}</span>
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        className="w-8 h-8 font-black text-base flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
                      >+</button>
                    </div>
                    <button
                      onClick={closeProduct}
                      className="py-3.5 px-5 font-black text-xs tracking-widest uppercase"
                      style={{ backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }}
                    >
                      Listo
                    </button>
                  </div>
                )}

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase font-bold transition-opacity hover:opacity-70"
                  style={{ border: '1px solid #EBEBEB', color: '#6A6A6A' }}
                >
                  <WaIcon />
                  Compartir producto
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore.js';
import clientData from '../../data/client.json';

const currency = clientData.currency ?? '$';
const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotal = useCartStore((s) => s.getTotal);
  const buildWhatsAppUrl = useCartStore((s) => s.buildWhatsAppUrl);

  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'var(--color-brand-black)' }}
          />
          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="fixed top-0 right-0 h-full z-50 flex flex-col"
            style={{ width: 'min(100vw, 380px)', backgroundColor: 'var(--color-brand-black)' }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-brand-accent) 30%, transparent)' }}>
              <span className="font-light tracking-widest uppercase text-sm" style={{ ...SERIF, color: '#FFFFFF' }}>
                Tu pedido
              </span>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center text-xs font-black hover:opacity-60"
                style={{ color: 'var(--color-brand-muted)' }}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
                  <span className="text-4xl opacity-30">🛍️</span>
                  <p className="text-[11px] tracking-widest uppercase" style={{ color: 'var(--color-brand-muted)' }}>
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3" style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-brand-accent) 25%, transparent)', paddingBottom: '1rem' }}>
                    <span className="text-2xl w-8 text-center">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: '#FFFFFF' }}>{item.name}</p>
                      <p className="text-xs" style={{ color: 'var(--color-brand-muted)' }}>{currency}{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-sm"
                        style={{ border: '1px solid color-mix(in srgb, var(--color-brand-accent) 40%, transparent)', color: '#FFFFFF', backgroundColor: 'transparent' }}
                      >−</button>
                      <span className="w-4 text-center text-sm font-black" style={{ color: '#FFFFFF' }}>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-sm"
                        style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
                      >+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs hover:opacity-60 ml-1" style={{ color: 'var(--color-brand-muted)' }}>✕</button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 py-5 flex flex-col gap-3" style={{ borderTop: '1px solid color-mix(in srgb, var(--color-brand-accent) 30%, transparent)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--color-brand-muted)' }}>Total</span>
                  <span className="font-light" style={{ ...SERIF, fontSize: '1.5rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
                    {currency}{total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => window.open(buildWhatsAppUrl(), '_blank')}
                  className="w-full py-4 font-black text-xs tracking-widest uppercase transition-opacity hover:opacity-85"
                  style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
                >
                  Confirmar pedido
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-[10px] tracking-widest uppercase font-bold hover:opacity-60"
                  style={{ color: 'var(--color-brand-muted)' }}
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

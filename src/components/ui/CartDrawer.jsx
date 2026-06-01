import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore.js';
import clientData from '../../data/client.json';
import deliveryZones from '../../data/delivery.json';

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

  const [districtInput, setDistrictInput] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const total = getTotal();

  const deliveryFee = deliveryZones.find((z) => z.distrito === selectedDistrict)?.precio ?? null;

  const filteredZones = districtInput
    ? deliveryZones.filter((z) =>
        z.distrito.toLowerCase().includes(districtInput.toLowerCase())
      )
    : [];

  const handleSelectZone = (z) => {
    setSelectedDistrict(z.distrito);
    setDistrictInput(z.distrito);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSelectedDistrict('');
    setDistrictInput('');
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowDropdown(false);
    };
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

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
              <div className="px-5 pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid color-mix(in srgb, var(--color-brand-accent) 30%, transparent)', paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
                {/* District selector - optional */}
                <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--color-brand-muted)' }}>
                      📍 Entregar en...
                    </label>
                    {selectedDistrict && (
                      <button
                        onClick={handleClear}
                        className="text-[9px] hover:opacity-60"
                        style={{ color: 'var(--color-brand-accent)' }}
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={districtInput}
                    onChange={(e) => {
                      setDistrictInput(e.target.value);
                      if (e.target.value) setShowDropdown(true);
                    }}
                    onFocus={() => districtInput && setShowDropdown(true)}
                    placeholder="Busca tu distrito..."
                    className="w-full px-3 py-2 text-sm"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-brand-accent) 15%, var(--color-brand-black))',
                      border: `1px solid ${selectedDistrict ? 'var(--color-brand-accent)' : 'color-mix(in srgb, var(--color-brand-accent) 40%, transparent)'}`,
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                  />

                  {/* Dropdown list */}
                  {showDropdown && filteredZones.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.1 }}
                      className="absolute top-full left-0 right-0 mt-1 rounded shadow-lg z-10 max-h-40 overflow-y-auto"
                      style={{ backgroundColor: 'var(--color-brand-black)', border: '1px solid color-mix(in srgb, var(--color-brand-accent) 40%, transparent)' }}
                    >
                      {filteredZones.map((z) => (
                        <button
                          key={z.distrito}
                          onClick={() => handleSelectZone(z)}
                          className="w-full text-left px-3 py-2.5 text-sm hover:bg-opacity-70 transition-colors flex items-center justify-between"
                          style={{ color: '#FFFFFF', borderBottom: '1px solid color-mix(in srgb, var(--color-brand-accent) 20%, transparent)' }}
                        >
                          <span>{z.distrito}</span>
                          <span style={{ fontSize: '11px', color: 'var(--color-brand-accent)', fontWeight: 'bold' }}>
                            {z.precio > 0 ? `+${currency}${z.precio}` : 'Gratis'}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {showDropdown && districtInput && filteredZones.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded px-3 py-2 text-xs" style={{ backgroundColor: 'var(--color-brand-black)', border: '1px solid color-mix(in srgb, var(--color-brand-accent) 40%, transparent)', color: 'var(--color-brand-muted)' }}>
                      Sin resultados
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: 'var(--color-brand-muted)' }}>Subtotal</span>
                    <span className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{currency}{total.toFixed(2)}</span>
                  </div>
                  {selectedDistrict && deliveryFee !== null && deliveryFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--color-brand-muted)' }}>Delivery</span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-brand-accent)' }}>
                        +{currency}{deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1" style={{ borderTop: '1px solid color-mix(in srgb, var(--color-brand-accent) 20%, transparent)' }}>
                    <span className="text-xs font-black" style={{ color: 'var(--color-brand-muted)' }}>Total</span>
                    <span className="font-black text-lg" style={{ color: '#FFFFFF' }}>
                      {currency}{(total + (deliveryFee ?? 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, opacity: 0.9 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(buildWhatsAppUrl(selectedDistrict, deliveryFee ?? 0), '_blank')}
                  className="w-full py-4 font-black text-xs tracking-widest uppercase"
                  style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
                >
                  Confirmar pedido
                </motion.button>
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

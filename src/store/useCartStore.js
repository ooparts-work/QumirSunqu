import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import clientData from '../data/client.json';

const currency = clientData.currency ?? '$';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      viewProduct: null,
      orderCounts: {},

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return { items: state.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, delta) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          const newQty = item.qty + delta;
          if (newQty <= 0) return { items: state.items.filter((i) => i.id !== id) };
          return { items: state.items.map((i) => i.id === id ? { ...i, qty: newQty } : i) };
        }),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openProduct: (product) => set({ viewProduct: product }),
      closeProduct: () => set({ viewProduct: null }),

      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      recordOrder: () =>
        set((state) => {
          const newCounts = { ...state.orderCounts };
          state.items.forEach((item) => {
            const key = String(item.id);
            newCounts[key] = (newCounts[key] || 0) + item.qty;
          });
          return { orderCounts: newCounts };
        }),

      getFavoriteId: () => {
        const counts = get().orderCounts;
        const entries = Object.entries(counts);
        if (entries.length === 0) return null;
        const [topId] = entries.reduce((a, b) => (Number(a[1]) >= Number(b[1]) ? a : b));
        return parseInt(topId, 10);
      },

      buildWhatsAppUrl: () => {
        get().recordOrder();
        const items = get().items;
        const lines = items.map((i) => `${i.emoji} *${i.name}* × ${i.qty}`);
        const message = [
          `¡Hola, ${clientData.name}! 👋`,
          '',
          'Quisiera encargar los siguientes productos:',
          '',
          ...lines,
          '',
          '¿Me pueden confirmar disponibilidad y coordinar la entrega? ¡Muchas gracias! 🌿😊',
        ].join('\n');
        return `https://wa.me/${clientData.whatsapp}?text=${encodeURIComponent(message)}`;
      },

      buildShareUrl: (product) => {
        const message = [
          `¿Conoces *${clientData.name}*? 🌿`,
          '',
          `Te recomiendo *${product.name}* ${product.emoji}`,
          '',
          `✨ ${currency}${product.price.toFixed(2)}`,
          `_${product.description}_`,
          '',
          `¡Pídelo acá! 👉 https://wa.me/${clientData.whatsapp}`,
        ].join('\n');
        return `https://wa.me/?text=${encodeURIComponent(message)}`;
      },

      // TODO: connect to your backend (Google Apps Script, etc.)
      submitOrder: () => {},
    }),
    {
      name: 'cart-store',
      partialize: (state) => ({ items: state.items, orderCounts: state.orderCounts }),
    }
  )
);

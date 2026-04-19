import { create } from 'zustand';

export interface CartItem {
  variantId: number;
  productName: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const existing = get().items.find((i) => i.variantId === item.variantId);
    if (existing) {
      if (existing.quantity >= item.stock) return; // Prevent over-stock
      set({
        items: get().items.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      if (item.stock <= 0) return; // Out of stock
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (variantId) => {
    set({ items: get().items.filter((i) => i.variantId !== variantId) });
  },

  updateQuantity: (variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(variantId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: Math.min(quantity, i.stock) }
          : i
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  totalPrice: () => get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  cardType?: string; // visa, mastercard, etc.
  last4: string;
  expiry: string;
  name: string;
  // Address fields
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  createdAt: number;
}

export type PaymentMethodInput = Omit<PaymentMethod, 'id' | 'createdAt'>;

const STORAGE_KEY = 'payment_methods';

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPaymentMethods(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveToStorage = useCallback((methods: PaymentMethod[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
    } catch (error) {
      console.error('Error saving payment methods:', error);
    }
  }, []);

  const addPaymentMethod = useCallback(
    (method: PaymentMethodInput) => {
      const newMethod: PaymentMethod = {
        ...method,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setPaymentMethods((prev) => {
        const updated = [...prev, newMethod];
        saveToStorage(updated);
        return updated;
      });
      return newMethod;
    },
    [saveToStorage],
  );

  const updatePaymentMethod = useCallback(
    (id: string, updates: Partial<PaymentMethodInput>) => {
      setPaymentMethods((prev) => {
        const updated = prev.map((m) =>
          m.id === id ? { ...m, ...updates } : m,
        );
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage],
  );

  const removePaymentMethod = useCallback(
    (id: string) => {
      setPaymentMethods((prev) => {
        const updated = prev.filter((m) => m.id !== id);
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage],
  );

  return {
    paymentMethods,
    isLoading,
    addPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod,
  };
}

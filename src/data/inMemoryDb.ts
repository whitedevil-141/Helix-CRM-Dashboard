import type { HelixDb, HelixData } from '@/types';

const resolveDb = (): HelixDb => {
  if (typeof window === 'undefined') {
    throw new Error('HELIX_DB is unavailable outside the browser.');
  }
  if (!window.HELIX_DB) {
    throw new Error('HELIX_DB not found. Ensure data.js loads before main.tsx.');
  }
  return window.HELIX_DB;
};

export const getHelixDb = (): HelixDb => resolveDb();

export const getHelixData = (): HelixData => resolveDb().data;

export const moveDeal = (id: string, toStage: string, options?: { fromStage?: string; updateProgress?: boolean }) =>
  resolveDb().moveDeal(id, toStage, options);

export const getDbJson = (): string => resolveDb().toJson();

export const exportDbJson = (filename?: string): void => resolveDb().exportJson(filename);

export const saveDbToStorage = (): void => resolveDb().saveToStorage();

export const loadDbFromStorage = (): boolean => resolveDb().loadFromStorage();

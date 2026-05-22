import type { HelixDb, HelixData } from '@/types';

declare global {
  interface Window {
    HELIX_DB: HelixDb;
    HELIX_DATA: HelixData;
  }
}

export {};

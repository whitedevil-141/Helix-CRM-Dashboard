import { useRef, useSyncExternalStore } from 'react';
import { getHelixDb } from '@/data/inMemoryDb';
import type { HelixData } from '@/types';

export const useHelixDb = () => getHelixDb();

export const useHelixTable = <K extends keyof HelixData>(key: K): HelixData[K] => {
  const db = getHelixDb();
  const snapshotRef = useRef<{ version: number; value: HelixData[K] } | null>(null);
  return useSyncExternalStore(
    (listener) => db.subscribe(() => listener()),
    () => {
      const version = db.getVersion();
      const cached = snapshotRef.current;
      if (cached && cached.version === version) return cached.value;
      const next = db.list(key);
      snapshotRef.current = { version, value: next };
      return next;
    },
  );
};

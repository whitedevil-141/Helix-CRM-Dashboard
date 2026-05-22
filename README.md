# Helix CRM Dashboard

## In-memory DB

Both the prototype (Helix CRM.html) and the Vite app load data from data.js.
That file creates a global in-memory DB at window.HELIX_DB and exposes the
current data snapshot at window.HELIX_DATA.

### Vite app

index.html loads /data.js before /src/main.tsx. Use the helpers below:

```ts
import { getHelixDb } from '@/data/inMemoryDb';
import { useHelixTable } from '@/hooks/useHelixDb';

const db = getHelixDb();
const deals = useHelixTable('SEED_DEALS');

db.create('SEED_DEALS', newDeal, { bucket: 'lead' });
```

### Prototype

data.js is already loaded by Helix CRM.html.

```js
const deals = window.HELIX_DB.list('SEED_DEALS');
window.HELIX_DB.moveDeal('d3', 'proposal');
```

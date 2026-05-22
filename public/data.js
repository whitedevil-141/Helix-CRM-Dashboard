/* Mock data for Helix CRM */

const SEED_DEALS = {
  lead: [
    { id: 'd1', name: 'Q3 expansion proposal', co: 'Northwind Labs', value: 24500, tag: 'warm', members: ['SK','MO'], progress: 18 },
    { id: 'd2', name: 'Pilot onboarding', co: 'Helios Robotics', value: 8200, tag: 'cold', members: ['SK'], progress: 10 },
    { id: 'd3', name: 'Enterprise SSO upgrade', co: 'Pinecone Logistics', value: 41000, tag: 'warm', members: ['MO','AR'], progress: 22 },
  ],
  qualified: [
    { id: 'd4', name: 'Annual contract renewal', co: 'Atlas Freight', value: 86400, tag: 'hot', members: ['AR','SK','DV'], progress: 42 },
    { id: 'd5', name: 'Multi-seat rollout', co: 'Glasswing Studio', value: 17900, tag: 'warm', members: ['DV'], progress: 38 },
  ],
  proposal: [
    { id: 'd6', name: 'Custom integrations', co: 'Vertex Health', value: 132000, tag: 'hot', members: ['MO','AR'], progress: 64 },
    { id: 'd7', name: 'Workspace migration', co: 'Brightside Co.', value: 28600, tag: 'warm', members: ['SK','DV'], progress: 55 },
    { id: 'd8', name: 'API access tier', co: 'Lumen Mobility', value: 9400, tag: 'cold', members: ['DV'], progress: 50 },
  ],
  negotiation: [
    { id: 'd9', name: 'Procurement signoff', co: 'Aether Bank', value: 218000, tag: 'hot', members: ['AR','MO'], progress: 82 },
    { id: 'd10', name: 'Legal review', co: 'Wavelet AI', value: 64500, tag: 'warm', members: ['SK'], progress: 76 },
  ],
  closed: [
    { id: 'd11', name: 'Year-2 renewal', co: 'Pearl Maritime', value: 52000, tag: 'warm', members: ['MO'], progress: 100 },
    { id: 'd12', name: 'Add-on seats', co: 'Orbit Studios', value: 11200, tag: 'warm', members: ['DV','AR'], progress: 100 },
  ],
};

const STAGES = [
  { id: 'lead', name: 'Lead', color: '#60A5FA' },
  { id: 'qualified', name: 'Qualified', color: '#22D3EE' },
  { id: 'proposal', name: 'Proposal', color: '#A78BFA' },
  { id: 'negotiation', name: 'Negotiation', color: '#F472B6' },
  { id: 'closed', name: 'Closed Won', color: '#34D399' },
];

const CUSTOMERS = [
  { id: 1, name: 'Maya Okafor', email: 'maya@northwindlabs.io', company: 'Northwind Labs', plan: 'Enterprise', mrr: 4200, status: 'active', country: '🇺🇸', joined: 'Mar 2024', owner: 'AR' },
  { id: 2, name: 'Henrik Sørensen', email: 'henrik@atlasfreight.dk', company: 'Atlas Freight', plan: 'Scale', mrr: 7200, status: 'active', country: '🇩🇰', joined: 'Jan 2024', owner: 'MO' },
  { id: 3, name: 'Priya Raman', email: 'priya@vertexhealth.io', company: 'Vertex Health', plan: 'Enterprise', mrr: 11000, status: 'active', country: '🇮🇳', joined: 'Nov 2023', owner: 'SK' },
  { id: 4, name: 'Theo Beaumont', email: 'theo@glasswing.fr', company: 'Glasswing Studio', plan: 'Pro', mrr: 1490, status: 'trial', country: '🇫🇷', joined: 'May 2026', owner: 'DV' },
  { id: 5, name: 'Sara Ben-Ami', email: 'sara@aetherbank.com', company: 'Aether Bank', plan: 'Enterprise', mrr: 18200, status: 'active', country: '🇮🇱', joined: 'Sep 2023', owner: 'AR' },
  { id: 6, name: 'Lucas Reinhardt', email: 'lucas@wavelet.ai', company: 'Wavelet AI', plan: 'Scale', mrr: 5380, status: 'active', country: '🇩🇪', joined: 'Feb 2025', owner: 'MO' },
  { id: 7, name: 'Yuki Tanaka', email: 'yuki@orbit.studio', company: 'Orbit Studios', plan: 'Pro', mrr: 940, status: 'active', country: '🇯🇵', joined: 'Aug 2024', owner: 'DV' },
  { id: 8, name: 'Marco Esposito', email: 'marco@pinecone.co', company: 'Pinecone Logistics', plan: 'Scale', mrr: 3400, status: 'lead', country: '🇮🇹', joined: 'Apr 2026', owner: 'SK' },
  { id: 9, name: 'Anika Schreiber', email: 'anika@brightside.co', company: 'Brightside Co.', plan: 'Pro', mrr: 0, status: 'churn', country: '🇨🇭', joined: 'Jul 2023', owner: 'MO' },
  { id: 10, name: 'Oluwaseun Adebayo', email: 'olu@helios.bot', company: 'Helios Robotics', plan: 'Pro', mrr: 720, status: 'trial', country: '🇳🇬', joined: 'May 2026', owner: 'DV' },
  { id: 11, name: 'Camille Martel', email: 'camille@pearl.fr', company: 'Pearl Maritime', plan: 'Scale', mrr: 4100, status: 'active', country: '🇫🇷', joined: 'Oct 2024', owner: 'AR' },
  { id: 12, name: 'Devon Carter', email: 'devon@lumen.io', company: 'Lumen Mobility', plan: 'Pro', mrr: 1280, status: 'lead', country: '🇨🇦', joined: 'May 2026', owner: 'SK' },
];

const ACTIVITY = [
  { id: 'a1', kind: 'success', text: '<b>Aether Bank</b> moved to Negotiation', meta: 'by Mira Okafor', time: '2m ago' },
  { id: 'a2', kind: 'info', text: '<b>Priya Raman</b> upgraded to Enterprise', meta: '', time: '14m ago' },
  { id: 'a3', kind: 'warn', text: 'Trial ending in 3 days — <b>Glasswing Studio</b>', meta: '', time: '38m ago' },
  { id: 'a4', kind: 'info', text: 'New lead from <b>helios.bot</b> via webform', meta: '', time: '1h ago' },
  { id: 'a5', kind: 'success', text: 'Deal <b>$52,000</b> closed with Pearl Maritime', meta: '', time: '3h ago' },
  { id: 'a6', kind: 'info', text: 'Automation <b>Win-back EU</b> sent to 218 leads', meta: '', time: 'yesterday' },
];

// chart data — 12 months
const REV_THIS = [42, 48, 51, 58, 56, 63, 71, 78, 82, 89, 97, 112];
const REV_LAST = [38, 41, 44, 46, 50, 52, 58, 61, 64, 70, 74, 79];
const MONTHS = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

const FUNNEL = [
  { label: 'Visitors',   value: 24800, pct: 100 },
  { label: 'Signups',    value: 6420,  pct: 25.9 },
  { label: 'Activated',  value: 3180,  pct: 12.8 },
  { label: 'Trial',      value: 1240,  pct: 5.0 },
  { label: 'Paid',       value: 412,   pct: 1.66 },
];

// 7 days x 24 hours activity heatmap
const HEAT = (() => {
  const rows = [];
  for (let r = 0; r < 7; r++) {
    const row = [];
    for (let c = 0; c < 24; c++) {
      // simulate workday peaks
      let v = 0;
      if (c >= 8 && c <= 19) v = 0.35 + Math.random() * 0.55;
      else v = Math.random() * 0.18;
      if (r >= 5) v *= 0.45; // weekend dip
      row.push(+v.toFixed(2));
    }
    rows.push(row);
  }
  return rows;
})();

const HELIX_SEED = { SEED_DEALS, STAGES, CUSTOMERS, ACTIVITY, REV_THIS, REV_LAST, MONTHS, FUNNEL, HEAT };

const STORAGE_KEY = 'helix.db.v1';

const clone = (value) => JSON.parse(JSON.stringify(value));
const serialize = (value) => JSON.stringify(value, null, 2);

const canUseStorage = () => {
  try {
    return typeof localStorage !== 'undefined';
  } catch (_) {
    return false;
  }
};

const readStorage = () => {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
};

const writeStorage = (value) => {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY, serialize(value));
  } catch (_) {}
};

const downloadJson = (payload, filename) => {
  if (typeof document === 'undefined') return;
  try {
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'helix-db.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (_) {}
};

const isRecordOfArrays = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.values(value).every(Array.isArray);
};

const findById = (collection, id) => {
  if (Array.isArray(collection)) {
    const index = collection.findIndex(item => item && item.id === id);
    return index === -1 ? null : { list: collection, index };
  }
  if (isRecordOfArrays(collection)) {
    for (const bucket of Object.keys(collection)) {
      const list = collection[bucket];
      const index = list.findIndex(item => item && item.id === id);
      if (index !== -1) return { list, index, bucket };
    }
  }
  return null;
};

function createInMemoryDb(seed) {
  const state = clone(seed);
  const listeners = new Set();
  let version = 0;

  const hydrate = (snapshot) => {
    if (!snapshot || typeof snapshot !== 'object') return false;
    const fresh = clone(snapshot);
    Object.keys(state).forEach((k) => { delete state[k]; });
    Object.assign(state, fresh);
    return true;
  };

  const saved = readStorage();
  if (saved) hydrate(saved);

  const notify = () => {
    version += 1;
    writeStorage(state);
    listeners.forEach(listener => listener(state));
  };
  const ensureTable = (key) => {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      throw new Error(`Unknown table: ${key}`);
    }
    return state[key];
  };

  return {
    data: state,
    getVersion() {
      return version;
    },
    toJson() {
      return serialize(state);
    },
    exportJson(filename) {
      downloadJson(serialize(state), filename);
    },
    saveToStorage() {
      writeStorage(state);
    },
    loadFromStorage() {
      const next = readStorage();
      if (!next) return false;
      const ok = hydrate(next);
      if (ok) notify();
      return ok;
    },
    get(key) {
      return ensureTable(key);
    },
    list(key) {
      return clone(ensureTable(key));
    },
    create(key, item, options = {}) {
      const table = ensureTable(key);
      if (Array.isArray(table)) {
        table.push(item);
        notify();
        return item;
      }
      if (isRecordOfArrays(table)) {
        const bucket = options.bucket || options.stageId || options.stage || (item && item.stage);
        if (!bucket) throw new Error('Missing bucket for record-of-arrays table.');
        if (!table[bucket]) table[bucket] = [];
        table[bucket].push(item);
        notify();
        return item;
      }
      throw new Error(`Unsupported table type: ${key}`);
    },
    update(key, id, patch) {
      const table = ensureTable(key);
      const hit = findById(table, id);
      if (!hit) return null;
      hit.list[hit.index] = { ...hit.list[hit.index], ...patch };
      notify();
      return hit.list[hit.index];
    },
    remove(key, id) {
      const table = ensureTable(key);
      const hit = findById(table, id);
      if (!hit) return null;
      const [removed] = hit.list.splice(hit.index, 1);
      notify();
      return removed;
    },
    moveDeal(id, toStage, options = {}) {
      const deals = ensureTable('SEED_DEALS');
      const stages = ensureTable('STAGES');
      if (!toStage) return null;

      let fromStage = options.fromStage || null;
      let found = null;

      if (fromStage && deals[fromStage]) {
        const hit = deals[fromStage].find(d => d.id === id);
        if (hit) found = hit;
      }

      if (!found) {
        for (const bucket of Object.keys(deals)) {
          const hit = deals[bucket].find(d => d.id === id);
          if (hit) {
            found = hit;
            fromStage = bucket;
            break;
          }
        }
      }

      if (!found || !fromStage || fromStage === toStage) return found;

      deals[fromStage] = deals[fromStage].filter(d => d.id !== id);
      if (!deals[toStage]) deals[toStage] = [];

      const stageIdx = stages.findIndex(s => s.id === toStage);
      const progressMap = [18, 40, 60, 80, 100];
      const shouldUpdate = options.updateProgress !== false;
      const moved = shouldUpdate && stageIdx !== -1
        ? { ...found, progress: progressMap[stageIdx] ?? found.progress }
        : found;

      deals[toStage] = [moved, ...deals[toStage]];
      notify();
      return moved;
    },
    reset() {
      const fresh = clone(seed);
      Object.keys(state).forEach((k) => { delete state[k]; });
      Object.assign(state, fresh);
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const HELIX_DB = createInMemoryDb(HELIX_SEED);

window.HELIX_DB = HELIX_DB;
window.HELIX_DATA = HELIX_DB.data;

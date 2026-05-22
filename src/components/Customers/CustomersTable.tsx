import { useState, useMemo } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { initials } from '@/utils/initials';
import { avatarColor } from '@/utils/avatarColor';
import type { Customer } from '@/types';

interface SortState {
  key: keyof Customer;
  dir: 'asc' | 'desc';
}

interface CustomersTableProps {
  rows: Customer[];
  onSelect: (customer: Customer) => void;
}

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'trial', label: 'Trial' },
  { id: 'lead', label: 'Lead' },
  { id: 'churn', label: 'Churned' },
] as const;

export function CustomersTable({ rows, onSelect }: CustomersTableProps) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState<SortState>({ key: 'mrr', dir: 'desc' });

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== 'all') r = r.filter(x => x.status === filter);
    if (q) {
      const ql = q.toLowerCase();
      r = r.filter(x =>
        x.name.toLowerCase().includes(ql) ||
        x.company.toLowerCase().includes(ql) ||
        x.email.toLowerCase().includes(ql),
      );
    }
    const { key, dir } = sort;
    r = [...r].sort((a, b) => {
      const av = a[key], bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') {
        return dir === 'asc' ? av - bv : bv - av;
      }
      return dir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return r;
  }, [rows, q, filter, sort]);

  const toggle = (k: keyof Customer) =>
    setSort(s => s.key === k ? { key: k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: k, dir: 'desc' });

  return (
    <>
      <div className="filter-bar">
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Icon name="search" size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
          <input
            className="search"
            placeholder="Filter customers…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ paddingLeft: 34 }}
          />
        </div>
        {STATUS_FILTERS.map(f => (
          <button key={f.id} className={'chip' + (filter === f.id ? ' on' : '')} onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
        <button className="chip" style={{ marginLeft: 'auto' }}>
          <Icon name="filter" size={12}/> Advanced
        </button>
        <button className="chip">
          <Icon name="download" size={12}/> Export
        </button>
      </div>

      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th onClick={() => toggle('name')}>Customer</th>
              <th onClick={() => toggle('company')}>Company</th>
              <th onClick={() => toggle('plan')}>Plan</th>
              <th onClick={() => toggle('mrr')} style={{ textAlign: 'right' }}>MRR</th>
              <th onClick={() => toggle('status')}>Status</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} onClick={() => onSelect(r)}>
                <td>
                  <div className="cust-cell">
                    <div className="avatar">{initials(r.name)}</div>
                    <div>
                      <div className="cust-name">{r.country} {r.name}</div>
                      <div className="cust-mail">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td>{r.company}</td>
                <td><span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{r.plan}</span></td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontWeight: 500 }}>${r.mrr.toLocaleString()}</td>
                <td><span className={'status ' + r.status}>{r.status}</span></td>
                <td>
                  <div className="avatar" style={{ width: 24, height: 24, fontSize: 10, background: avatarColor(r.owner), color: '#fff', borderColor: 'transparent' }}>
                    {r.owner}
                  </div>
                </td>
                <td><Icon name="chevronRight" size={14} style={{ color: 'var(--text-muted)' }}/></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px' }}>No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

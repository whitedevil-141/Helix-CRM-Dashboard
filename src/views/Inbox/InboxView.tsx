import { useState, useMemo } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { initials } from '@/utils/initials';
import { dispatchCompose } from '@/utils/eventBus';

interface Thread {
  id: string;
  from: string;
  co: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred?: boolean;
  label: string;
}

const THREADS: Thread[] = [
  { id: 't1', from: 'Priya Raman', co: 'Vertex Health', subject: 'Re: Custom integration scoping', preview: 'Thanks for the call yesterday. I had a chance to share the spec with our engineering lead and they have a few questions about the webhook retry behavior…', time: '2h', unread: true, starred: true, label: 'deal' },
  { id: 't2', from: 'Henrik Sørensen', co: 'Atlas Freight', subject: 'Renewal — pricing question', preview: 'Quick one before the renewal call: can you confirm whether the per-seat add-on is prorated if we onboard mid-cycle?', time: '4h', unread: true, label: 'billing' },
  { id: 't3', from: 'Sara Ben-Ami', co: 'Aether Bank', subject: 'Procurement signoff status', preview: 'Procurement has approved the contract. Sending you the signed PDF now — the W-9 we have on file is current.', time: '6h', unread: true, label: 'deal' },
  { id: 't4', from: 'Lucas Reinhardt', co: 'Wavelet AI', subject: 'Workflow templates feedback', preview: 'The team has been using the new templates for two weeks. Some quick wins and a few rough edges I want to flag.', time: 'yest.', unread: false, starred: true, label: 'feedback' },
  { id: 't5', from: 'Theo Beaumont', co: 'Glasswing Studio', subject: 'Trial extension?', preview: 'We are close to a decision but need another two weeks to align with our annual planning. Any way to extend the trial?', time: 'yest.', unread: false, label: 'trial' },
  { id: 't6', from: 'Marco Esposito', co: 'Pinecone Logistics', subject: 'Demo follow-up', preview: 'Great session today. I have shared the recording internally — could you send over the security overview as a follow-up?', time: '2d', unread: false, label: 'demo' },
  { id: 't7', from: 'Yuki Tanaka', co: 'Orbit Studios', subject: 'Add-on seats invoice', preview: 'Could you re-issue Aug invoice with our Tokyo billing address? Details attached.', time: '3d', unread: false, label: 'billing' },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'starred', label: 'Starred' },
] as const;

export function InboxView() {
  const [filter, setFilter] = useState<string>('all');
  const [activeId, setActiveId] = useState('t1');

  const filtered = useMemo(() => {
    if (filter === 'unread') return THREADS.filter(t => t.unread);
    if (filter === 'starred') return THREADS.filter(t => t.starred);
    return THREADS;
  }, [filter]);

  const active = THREADS.find(t => t.id === activeId) || filtered[0];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Inbox</h1>
          <div className="sub">8 unread · 2 starred · synced 1 min ago</div>
        </div>
        <div className="right">
          <button className="btn"><Icon name="filter" size={13}/> Filter</button>
          <button className="btn btn-primary" onClick={dispatchCompose}><Icon name="plus" size={13}/> Compose</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="inbox-grid">
          <div className="inbox-list">
            <div className="inbox-list-head">
              <div className="seg" style={{ width: '100%' }}>
                {FILTERS.map(t => (
                  <button key={t.id} className={filter === t.id ? 'on' : ''} onClick={() => setFilter(t.id)} style={{ flex: 1 }}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className="inbox-threads">
              {filtered.map(t => (
                <button
                  key={t.id}
                  className={'thread' + (activeId === t.id ? ' active' : '') + (t.unread ? ' unread' : '')}
                  onClick={() => setActiveId(t.id)}
                >
                  <div className="thread-row1">
                    <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{initials(t.from)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="thread-from">{t.from}</div>
                      <div className="thread-co">{t.co}</div>
                    </div>
                    <div className="thread-time">{t.time}</div>
                  </div>
                  <div className="thread-subject">{t.subject}</div>
                  <div className="thread-preview">{t.preview}</div>
                  <div className="thread-foot">
                    <span className="tag" style={{ background: 'var(--card-hover)', color: 'var(--text-dim)' }}>{t.label}</span>
                    {t.starred && <Icon name="star" size={12} style={{ color: 'var(--amber)', fill: 'var(--amber)' }}/>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="inbox-detail">
            {active && (
              <>
                <div className="inbox-detail-head">
                  <div>
                    <div className="inbox-subject">{active.subject}</div>
                    <div className="inbox-meta">
                      <span className="tag">{active.label}</span>
                      <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>{active.from} · {active.co}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="icon-btn"><Icon name="return" size={15}/></button>
                    <button className="icon-btn"><Icon name="star" size={15}/></button>
                    <button className="icon-btn"><Icon name="more" size={15}/></button>
                  </div>
                </div>
                <div className="inbox-body">
                  <div className="msg">
                    <div className="msg-head">
                      <div className="avatar">{initials(active.from)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{active.from} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· {active.co}</span></div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>to me · {active.time} ago</div>
                      </div>
                    </div>
                    <div className="msg-body">
                      <p>{active.preview}</p>
                      <p>A couple of specifics we'd want to nail down before signing off:</p>
                      <ul>
                        <li>Webhook retry behavior on 5xx responses — is there an exponential backoff or fixed interval?</li>
                        <li>Whether the events API supports filtering by metadata at the source.</li>
                        <li>Rough cost expectation at 4× our current volume.</li>
                      </ul>
                      <p>Happy to set up a 30-minute call this week if it's easier to walk through.</p>
                      <p style={{ color: 'var(--text-dim)' }}>—<br/>{active.from}<br/>{active.co}</p>
                    </div>
                  </div>

                  <div className="msg-ai">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div className="ai-orb" style={{ width: 20, height: 20, borderRadius: 5 }}>
                        <Icon name="sparkles" size={11} style={{ color: 'var(--bg)' }}/>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>Helix suggestion</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-dim)' }}>This looks like a deal-progression email. Auto-draft a response with answers pulled from the API docs and tag the engineering team for verification?</p>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                      <button className="ai-pill">Draft reply</button>
                      <button className="ai-pill">Schedule call</button>
                      <button className="ai-pill">Dismiss</button>
                    </div>
                  </div>
                </div>
                <div className="inbox-reply">
                  <input className="search" placeholder="Reply to thread…" style={{ paddingLeft: 14 }}/>
                  <button className="btn btn-primary">Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

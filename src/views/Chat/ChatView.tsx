import { useState } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { dispatchToast } from '@/utils/eventBus';

interface Channel {
  id: string;
  name: string;
  count?: number;
  active?: boolean;
}

interface DM {
  id: string;
  name: string;
  initials: string;
  status: 'online' | 'away' | 'offline';
}

interface ChatMessage {
  id: number;
  who: string;
  initials: string;
  time: string;
  text: string;
  me?: boolean;
  ai?: boolean;
  reactions?: { e: string; n: number }[];
  attach?: { name: string; size: string };
}

const CHANNELS: Channel[] = [
  { id: 'c1', name: 'sales-emea', count: 8, active: true },
  { id: 'c2', name: 'pipeline-wins', count: 0 },
  { id: 'c3', name: 'customer-success', count: 3 },
  { id: 'c4', name: 'revenue-ops', count: 1 },
  { id: 'c5', name: 'product-feedback' },
  { id: 'c6', name: 'leadership' },
];

const DMS: DM[] = [
  { id: 'd1', name: 'Amelia Rouse', initials: 'AR', status: 'online' },
  { id: 'd2', name: 'Sun-Ho Kim',   initials: 'SK', status: 'away' },
  { id: 'd3', name: 'Devin Vega',   initials: 'DV', status: 'offline' },
];

const MESSAGES: ChatMessage[] = [
  { id: 1, who: 'Amelia Rouse', initials: 'AR', time: '9:42', text: "Just got off the call with Aether Bank's procurement team — they're sending the signed contract over today.", reactions: [{ e: '🎉', n: 3 }] },
  { id: 2, who: 'Mira Okafor',  initials: 'MO', time: '9:45', text: "Massive. That's the largest deal we've closed in EMEA this quarter. Coffee's on me.", me: true },
  { id: 3, who: 'Sun-Ho Kim',   initials: 'SK', time: '9:51', text: "Quick heads up — Vertex Health usage just dropped sharply. I'm pulling the report now but might be worth a CSM touchpoint." },
  { id: 4, who: 'Helix',        initials: 'H',  time: '9:52', text: "I flagged this earlier. Vertex Health usage is down 38% MTD, driven mostly by their integrations workspace. Two of three power users haven't logged in in 12 days.", ai: true },
  { id: 5, who: 'Amelia Rouse', initials: 'AR', time: '9:53', text: "Good catch. I'll set up a check-in for Thursday and pull their engineering lead into the loop.", attach: { name: 'Vertex-usage-summary.pdf', size: '342 KB' } },
];

export function ChatView() {
  const [text, setText] = useState('');

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Team chat</h1>
          <div className="sub">12 channels · 3 direct messages</div>
        </div>
        <div className="right">
          <button className="btn" onClick={() => dispatchToast('Channel creation coming soon')}><Icon name="plus" size={13}/> New channel</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="chat-grid">
          <aside className="chat-side">
            <div className="chat-side-section">
              <div className="chat-side-title">Channels</div>
              {CHANNELS.map(c => (
                <button key={c.id} className={'chat-side-item' + (c.active ? ' active' : '')}>
                  <span className="chat-hash">#</span>
                  <span className="sb-label">{c.name}</span>
                  {!!c.count && <span className="sb-badge">{c.count}</span>}
                </button>
              ))}
            </div>
            <div className="chat-side-section">
              <div className="chat-side-title">Direct messages</div>
              {DMS.map(d => (
                <button key={d.id} className="chat-side-item">
                  <span className={'chat-dm-status ' + d.status}></span>
                  <span className="sb-label">{d.name}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="chat-main">
            <div className="chat-header">
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}># sales-emea</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>EMEA sales coordination · 14 members</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="icon-btn"><Icon name="phone" size={15}/></button>
                <button className="icon-btn"><Icon name="users" size={15}/></button>
                <button className="icon-btn"><Icon name="settings" size={15}/></button>
              </div>
            </div>

            <div className="chat-stream">
              <div className="chat-divider"><span>Today · May 20</span></div>
              {MESSAGES.map(m => (
                <div key={m.id} className={'chat-msg' + (m.me ? ' me' : '') + (m.ai ? ' ai' : '')}>
                  <div
                    className="avatar"
                    style={m.ai
                      ? { background: 'var(--text)', color: 'var(--bg)', borderColor: 'transparent' }
                      : m.me ? { background: '#475569', color: '#fff', borderColor: 'transparent' } : {}
                    }
                  >
                    {m.ai ? <Icon name="sparkles" size={13}/> : m.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{m.who}</span>
                      {m.ai && <span className="tag" style={{ background: 'var(--card-hover)', color: 'var(--text-dim)' }}>AI</span>}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.time}</span>
                    </div>
                    <div className="chat-text">{m.text}</div>
                    {m.attach && (
                      <div className="chat-attach">
                        <Icon name="file" size={14}/>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 500 }}>{m.attach.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.attach.size}</div>
                        </div>
                      </div>
                    )}
                    {m.reactions && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                        {m.reactions.map((r, i) => (
                          <span key={i} className="chip" style={{ padding: '2px 8px', fontSize: 11 }}>{r.e} {r.n}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-composer">
              <input
                className="search"
                placeholder="Message #sales-emea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ paddingLeft: 14 }}
              />
              <button className="icon-btn" title="Attach"><Icon name="paperclip" size={15}/></button>
              <button className="btn btn-primary" disabled={!text}>Send</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

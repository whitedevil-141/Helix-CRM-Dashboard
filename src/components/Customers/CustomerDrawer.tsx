import { Icon } from '@/components/Icon/Icon';
import { initials } from '@/utils/initials';
import type { Customer } from '@/types';

interface CustomerDrawerProps {
  customer: Customer | null;
  onClose: () => void;
}

const ACTIVITY = [
  { kind: 'success', text: 'Renewed annual plan', time: '3 days ago' },
  { kind: 'info', text: 'Invited 2 teammates', time: '5 days ago' },
  { kind: 'info', text: 'Opened pricing email', time: '1 wk ago' },
];

const ENGAGEMENT = [
  { lbl: 'Health', val: '82', hint: 'Strong' },
  { lbl: 'Last seen', val: '2d', hint: 'ago' },
  { lbl: 'NPS', val: '+44', hint: 'promoter' },
];

export function CustomerDrawer({ customer, onClose }: CustomerDrawerProps) {
  return (
    <>
      <div className={'drawer-backdrop' + (customer ? ' open' : '')} onClick={onClose}></div>
      <aside className={'drawer' + (customer ? ' open' : '')}>
        {customer && (
          <>
            <div className="drawer-head">
              <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>{initials(customer.name)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{customer.country} {customer.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{customer.email} · {customer.company}</div>
              </div>
              <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={16}/></button>
            </div>
            <div className="drawer-body">
              <div className="drawer-section">
                <h4>Account</h4>
                <div className="field"><span className="k">Plan</span><span className="v">{customer.plan}</span></div>
                <div className="field"><span className="k">MRR</span><span className="v" style={{ fontFamily: 'var(--mono)' }}>${customer.mrr.toLocaleString()}</span></div>
                <div className="field"><span className="k">Status</span><span className="v"><span className={'status ' + customer.status}>{customer.status}</span></span></div>
                <div className="field"><span className="k">Joined</span><span className="v">{customer.joined}</span></div>
                <div className="field"><span className="k">Owner</span><span className="v">{customer.owner}</span></div>
              </div>

              <div className="drawer-section">
                <h4>Engagement</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {ENGAGEMENT.map(s => (
                    <div key={s.lbl} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 10 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.lbl}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{s.hint}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section">
                <h4>Recent activity</h4>
                <div className="feed">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="feed-item">
                      <div className={'feed-ic ' + a.kind}>
                        <Icon name={a.kind === 'success' ? 'check' : 'mail'} size={11}/>
                      </div>
                      <div className="feed-body">
                        <div className="feed-text">{a.text}</div>
                        <div className="feed-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}><Icon name="mail" size={14}/> Send message</button>
                <button className="btn"><Icon name="phone" size={14}/></button>
                <button className="btn"><Icon name="more" size={14}/></button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

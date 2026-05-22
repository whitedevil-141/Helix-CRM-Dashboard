import { useState, ReactNode } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { dispatchToast } from '@/utils/eventBus';

function SettingRow({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="setting-row">
      <div className="setting-label">
        <div className="setting-label-h">{label}</div>
        {hint && <div className="setting-hint">{hint}</div>}
      </div>
      <div className="setting-control">{children}</div>
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="card">
      <div className="settings-section">
        <div className="settings-section-h">Profile</div>
        <SettingRow label="Display name" hint="Shown across Helix and on shared deals.">
          <input className="search" defaultValue="Mira Okafor"/>
        </SettingRow>
        <SettingRow label="Email" hint="Used for sign-in and notifications.">
          <input className="search" defaultValue="mira@helix.app"/>
        </SettingRow>
        <SettingRow label="Role" hint="Determines default views.">
          <select className="search">
            <option>Head of Sales</option><option>Account Executive</option><option>Customer Success</option>
          </select>
        </SettingRow>
      </div>
      <div className="settings-section">
        <div className="settings-section-h">Preferences</div>
        <SettingRow label="Timezone">
          <select className="search"><option>UTC+1 · Lagos</option><option>UTC · London</option><option>UTC-5 · NYC</option></select>
        </SettingRow>
        <SettingRow label="Start week on">
          <div className="seg"><button className="on">Mon</button><button>Sun</button></div>
        </SettingRow>
        <SettingRow label="Default landing page">
          <select className="search"><option>Dashboard</option><option>Pipeline</option><option>Inbox</option></select>
        </SettingRow>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '16px 0 0', borderTop: '1px solid var(--border)' }}>
        <button className="btn">Cancel</button>
        <button className="btn btn-primary">Save changes</button>
      </div>
    </div>
  );
}

const TEAM_MEMBERS = [
  { name: 'Mira Okafor',  initials: 'MO', email: 'mira@helix.app',   role: 'Owner',  status: 'active' },
  { name: 'Amelia Rouse', initials: 'AR', email: 'amelia@helix.app', role: 'Admin',  status: 'active' },
  { name: 'Sun-Ho Kim',   initials: 'SK', email: 'sunho@helix.app',  role: 'Member', status: 'active' },
  { name: 'Devin Vega',   initials: 'DV', email: 'devin@helix.app',  role: 'Member', status: 'active' },
  { name: 'Lila Tran',    initials: 'LT', email: 'lila@helix.app',   role: 'Member', status: 'invited' },
];

function TeamPanel() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Team members</div>
          <div className="card-sub">5 members · 1 pending invite</div>
        </div>
        <button className="btn btn-primary" onClick={() => dispatchToast('Invite link copied to clipboard')}><Icon name="plus" size={13}/> Invite</button>
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {TEAM_MEMBERS.map(m => (
              <tr key={m.email}>
                <td>
                  <div className="cust-cell">
                    <div className="avatar" style={{ background: '#475569', color: '#fff', borderColor: 'transparent' }}>{m.initials}</div>
                    <div className="cust-name">{m.name}</div>
                  </div>
                </td>
                <td><span className="cust-mail">{m.email}</span></td>
                <td>{m.role}</td>
                <td><span className={'status ' + (m.status === 'active' ? 'active' : 'trial')}>{m.status}</span></td>
                <td><Icon name="more" size={14} style={{ color: 'var(--text-muted)' }}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const INVOICES = [
  { id: 'INV-2026-05', date: 'May 1, 2026', amt: 4990, status: 'paid' },
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amt: 4990, status: 'paid' },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amt: 4990, status: 'paid' },
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amt: 4490, status: 'paid' },
];

function BillingPanel() {
  return (
    <>
      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">Current plan</div>
            <div className="card-sub">Scale · billed annually</div>
          </div>
          <button className="btn">Change plan</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div className="kpi" style={{ padding: 14 }}>
            <div className="kpi-label">Seats</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>5 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/ 25</span></div>
            <div style={{ height: 3, background: 'var(--card-hover)', borderRadius: 100, marginTop: 10 }}>
              <div style={{ width: '20%', height: '100%', background: 'var(--text)', borderRadius: 100, opacity: 0.75 }}/>
            </div>
          </div>
          <div className="kpi" style={{ padding: 14 }}>
            <div className="kpi-label">Contacts</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>12,418 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/ 50K</span></div>
            <div style={{ height: 3, background: 'var(--card-hover)', borderRadius: 100, marginTop: 10 }}>
              <div style={{ width: '25%', height: '100%', background: 'var(--text)', borderRadius: 100, opacity: 0.75 }}/>
            </div>
          </div>
          <div className="kpi" style={{ padding: 14 }}>
            <div className="kpi-label">Automations</div>
            <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>4 <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/ unlimited</span></div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Invoices</div>
            <div className="card-sub">All amounts in USD</div>
          </div>
          <button className="btn"><Icon name="download" size={13}/> Download all</button>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Invoice</th><th>Date</th><th style={{ textAlign: 'right' }}>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'var(--mono)' }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--mono)' }}>${inv.amt.toFixed(2)}</td>
                  <td><span className="status active">{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const INTEGRATIONS = [
  { name: 'Gmail',           desc: 'Sync email threads to contacts',    on: true },
  { name: 'Google Calendar', desc: 'Two-way meeting sync',              on: true },
  { name: 'Slack',           desc: 'Send deal updates to channels',     on: true },
  { name: 'Stripe',          desc: 'Pull subscription + invoice data',  on: true },
  { name: 'Zapier',          desc: 'Connect 5000+ apps',                on: false },
  { name: 'Salesforce',      desc: 'Migrate contacts and deals',        on: false },
  { name: 'HubSpot',         desc: 'Two-way contact sync',              on: false },
  { name: 'Linear',          desc: 'Link product feedback to issues',   on: false },
];

function IntegrationsPanel() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {INTEGRATIONS.map(i => (
        <div key={i.name} className="card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 9, background: 'var(--card-hover)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 600 }}>
            {i.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{i.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-dim)' }}>{i.desc}</div>
          </div>
          <button className={'flow-toggle' + (i.on ? ' on' : '')}><i/></button>
        </div>
      ))}
    </div>
  );
}

const NOTIF_ROWS = [
  { lbl: 'Deal stage changes',            email: true,  push: true,  slack: true  },
  { lbl: 'New leads assigned to me',      email: true,  push: true,  slack: false },
  { lbl: 'Mentions in comments',          email: true,  push: true,  slack: true  },
  { lbl: 'Daily digest',                  email: true,  push: false, slack: false },
  { lbl: 'Weekly performance summary',    email: true,  push: false, slack: false },
  { lbl: 'Helix AI insights',             email: false, push: true,  slack: false },
];

function NotificationsPanel() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Notification preferences</div>
          <div className="card-sub">Choose how and where you want to be notified.</div>
        </div>
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Event</th><th style={{ textAlign: 'center' }}>Email</th><th style={{ textAlign: 'center' }}>Push</th><th style={{ textAlign: 'center' }}>Slack</th></tr></thead>
          <tbody>
            {NOTIF_ROWS.map(r => (
              <tr key={r.lbl}>
                <td><div className="cust-name">{r.lbl}</div></td>
                <td style={{ textAlign: 'center' }}><button className={'flow-toggle' + (r.email ? ' on' : '')}><i/></button></td>
                <td style={{ textAlign: 'center' }}><button className={'flow-toggle' + (r.push ? ' on' : '')}><i/></button></td>
                <td style={{ textAlign: 'center' }}><button className={'flow-toggle' + (r.slack ? ' on' : '')}><i/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SESSIONS = [
  { device: 'MacBook Pro · Chrome', loc: 'Lagos, NG',  when: 'Active now' },
  { device: 'iPhone 15 · Safari',   loc: 'Lagos, NG',  when: '2 hours ago' },
  { device: 'Windows · Firefox',    loc: 'London, UK', when: '3 days ago' },
];

function SecurityPanel() {
  return (
    <>
      <div className="card">
        <div className="settings-section">
          <div className="settings-section-h">Authentication</div>
          <SettingRow label="Two-factor authentication" hint="Use an authenticator app on sign-in."><button className="flow-toggle on"><i/></button></SettingRow>
          <SettingRow label="Single sign-on" hint="Enforce SSO for all members."><button className="flow-toggle"><i/></button></SettingRow>
          <SettingRow label="Recovery codes" hint="Print and store offline."><button className="btn">View codes</button></SettingRow>
        </div>
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <div className="settings-section">
          <div className="settings-section-h">Active sessions</div>
          {SESSIONS.map((s, i) => (
            <div key={i} className="setting-row" style={{ borderTop: i === 0 ? 'none' : undefined }}>
              <div>
                <div className="setting-label-h">{s.device}</div>
                <div className="setting-hint">{s.loc} · {s.when}</div>
              </div>
              <button className="btn">Revoke</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const TABS = [
  { id: 'profile',       label: 'Profile' },
  { id: 'team',          label: 'Team' },
  { id: 'billing',       label: 'Billing' },
  { id: 'integrations',  label: 'Integrations' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security',      label: 'Security' },
] as const;

type TabId = typeof TABS[number]['id'];

export function SettingsView() {
  const [tab, setTab] = useState<TabId>('profile');

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <div className="sub">Workspace, account, and integrations</div>
        </div>
      </div>

      <div className="settings-shell">
        <aside className="settings-tabs">
          {TABS.map(t => (
            <button key={t.id} className={'settings-tab' + (tab === t.id ? ' active' : '')} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </aside>

        <div className="settings-body">
          {tab === 'profile'       && <ProfilePanel/>}
          {tab === 'team'          && <TeamPanel/>}
          {tab === 'billing'       && <BillingPanel/>}
          {tab === 'integrations'  && <IntegrationsPanel/>}
          {tab === 'notifications' && <NotificationsPanel/>}
          {tab === 'security'      && <SecurityPanel/>}
        </div>
      </div>
    </>
  );
}

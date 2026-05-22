import { useState } from 'react';
import { Icon } from '@/components/Icon/Icon';

export function HelpWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="help-widget">
      {open && (
        <div className="help-panel" onClick={(e) => e.stopPropagation()}>
          <div className="help-head">
            <div>
              <div className="popover-title">Help &amp; resources</div>
              <div className="popover-sub">We typically reply in under 4 hours.</div>
            </div>
            <button className="icon-btn" onClick={() => setOpen(false)}><Icon name="close" size={14}/></button>
          </div>
          <div className="popover-menu" style={{ padding: 6 }}>
            <button className="popover-item"><Icon name="search" size={15}/>Search docs</button>
            <button className="popover-item">
              <Icon name="chat" size={15}/>Start a chat
              <span className="popover-kbd" style={{ background: 'var(--accent-tint-strong)', color: 'var(--text)', border: '1px solid var(--border)' }}>online</span>
            </button>
            <button className="popover-item"><Icon name="mail" size={15}/>Email support</button>
            <button className="popover-item"><Icon name="calendar" size={15}/>Book onboarding call</button>
          </div>
          <div className="popover-divider"/>
          <div style={{ padding: '10px 14px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>Quick links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Getting started', 'API reference', 'Keyboard shortcuts', "What's new"].map(l => (
                <button key={l} className="help-link">{l} <Icon name="chevronRight" size={11}/></button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className="help-toggle" onClick={() => setOpen(o => !o)} aria-label="Help">
        {open ? <Icon name="close" size={16}/> : <span style={{ fontWeight: 600, fontSize: 15 }}>?</span>}
      </button>
    </div>
  );
}

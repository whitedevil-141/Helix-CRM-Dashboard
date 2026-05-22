/* global React, Icon */
const { useState: useM, useEffect: useME, useRef: useMR } = React;

/* =========================================================
   MODAL PRIMITIVE
   ========================================================= */
function Modal({ open, onClose, title, subtitle, children, footer, size = 'md' }) {
  useME(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
  if (!open) return null;
  const widths = { sm: 420, md: 540, lg: 720, xl: 920 };
  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal-shell" style={{ width: widths[size] }} onClick={(e) => e.stopPropagation()}>
        {(title || subtitle) && (
          <div className="modal-head">
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && <div className="modal-title">{title}</div>}
              {subtitle && <div className="modal-sub">{subtitle}</div>}
            </div>
            <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={15}/></button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function Field({ label, hint, children, required, span = 1 }) {
  return (
    <div className="modal-field" style={{ gridColumn: `span ${span}` }}>
      <label className="modal-field-label">
        {label}
        {required && <span style={{ color: 'var(--red)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && <div className="modal-field-hint">{hint}</div>}
    </div>
  );
}

function IconInput({ icon, ...rest }) {
  return (
    <div className="icon-input">
      <Icon name={icon} size={14} className="icon-input-ic"/>
      <input className="search" {...rest}/>
    </div>
  );
}

function IconSelect({ icon, children, ...rest }) {
  return (
    <div className="icon-input">
      <Icon name={icon} size={14} className="icon-input-ic"/>
      <select className="search" {...rest}>{children}</select>
    </div>
  );
}

/* =========================================================
   NEW DEAL MODAL
   ========================================================= */
function NewDealModal({ open, onClose, onCreate }) {
  const [data, setData] = useM({ name: '', company: '', value: '', stage: 'lead', owner: 'MO', closeDate: '', tag: 'warm' });
  useME(() => { if (open) setData({ name: '', company: '', value: '', stage: 'lead', owner: 'MO', closeDate: '', tag: 'warm' }); }, [open]);
  const submit = () => {
    if (!data.name || !data.company) return;
    onCreate?.({ ...data, id: 'd' + Date.now(), value: Number(data.value) || 0, members: [data.owner], progress: 18 });
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} title="New deal" subtitle="Add a deal to your pipeline" size="md"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={submit} disabled={!data.name || !data.company}>Create deal</button>
      </>}
    >
      <div className="modal-grid">
        <Field label="Deal name" required span={2}>
          <IconInput icon="deals" placeholder="e.g. Annual contract renewal" value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} autoFocus/>
        </Field>
        <Field label="Company" required>
          <IconInput icon="panel" placeholder="Acme Inc." value={data.company} onChange={(e) => setData(d => ({ ...d, company: e.target.value }))}/>
        </Field>
        <Field label="Value">
          <div className="icon-input">
            <Icon name="money" size={14} className="icon-input-ic"/>
            <input className="search" type="number" placeholder="50,000" value={data.value} onChange={(e) => setData(d => ({ ...d, value: e.target.value }))} style={{ fontFamily: 'var(--mono)' }}/>
          </div>
        </Field>
        <Field label="Stage">
          <IconSelect icon="pipeline" value={data.stage} onChange={(e) => setData(d => ({ ...d, stage: e.target.value }))}>
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed">Closed Won</option>
          </IconSelect>
        </Field>
        <Field label="Owner">
          <IconSelect icon="user" value={data.owner} onChange={(e) => setData(d => ({ ...d, owner: e.target.value }))}>
            <option value="MO">Mira Okafor</option>
            <option value="AR">Amelia Rouse</option>
            <option value="SK">Sun-Ho Kim</option>
            <option value="DV">Devin Vega</option>
          </IconSelect>
        </Field>
        <Field label="Expected close">
          <IconInput icon="calendar" type="date" value={data.closeDate} onChange={(e) => setData(d => ({ ...d, closeDate: e.target.value }))}/>
        </Field>
        <Field label="Temperature">
          <div className="seg" style={{ width: '100%' }}>
            {['cold','warm','hot'].map(t => (
              <button key={t} className={data.tag === t ? 'on' : ''} onClick={() => setData(d => ({ ...d, tag: t }))} style={{ flex: 1, textTransform: 'capitalize' }}>{t}</button>
            ))}
          </div>
        </Field>
        <Field label="Notes" span={2}>
          <div className="icon-input icon-input-textarea">
            <Icon name="edit" size={14} className="icon-input-ic"/>
            <textarea className="search" placeholder="Anything important to remember about this deal…" rows={3} style={{ minHeight: 70, resize: 'vertical' }}/>
          </div>
        </Field>
      </div>
    </Modal>
  );
}

/* =========================================================
   NEW CONTACT MODAL
   ========================================================= */
function NewContactModal({ open, onClose, onCreate }) {
  const [data, setData] = useM({ name: '', email: '', company: '', plan: 'Pro', status: 'lead', owner: 'MO' });
  useME(() => { if (open) setData({ name: '', email: '', company: '', plan: 'Pro', status: 'lead', owner: 'MO' }); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="New contact" subtitle="Add a customer or lead to your CRM"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn" onClick={() => { onCreate?.(data); onClose(); }} disabled={!data.name || !data.email}>Add &amp; create another</button>
        <button className="btn btn-primary" onClick={() => { onCreate?.(data); onClose(); }} disabled={!data.name || !data.email}>Add contact</button>
      </>}
    >
      <div className="modal-grid">
        <Field label="Full name" required><IconInput icon="user" placeholder="Jane Doe" value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} autoFocus/></Field>
        <Field label="Email" required><IconInput icon="mail" type="email" placeholder="jane@acme.com" value={data.email} onChange={(e) => setData(d => ({ ...d, email: e.target.value }))}/></Field>
        <Field label="Company"><IconInput icon="panel" placeholder="Acme Inc." value={data.company} onChange={(e) => setData(d => ({ ...d, company: e.target.value }))}/></Field>
        <Field label="Plan">
          <IconSelect icon="tag" value={data.plan} onChange={(e) => setData(d => ({ ...d, plan: e.target.value }))}>
            <option>Pro</option><option>Scale</option><option>Enterprise</option>
          </IconSelect>
        </Field>
        <Field label="Status">
          <IconSelect icon="check" value={data.status} onChange={(e) => setData(d => ({ ...d, status: e.target.value }))}>
            <option value="lead">Lead</option><option value="trial">Trial</option><option value="active">Active</option>
          </IconSelect>
        </Field>
        <Field label="Owner">
          <IconSelect icon="user" value={data.owner} onChange={(e) => setData(d => ({ ...d, owner: e.target.value }))}>
            <option value="MO">Mira Okafor</option><option value="AR">Amelia Rouse</option><option value="SK">Sun-Ho Kim</option><option value="DV">Devin Vega</option>
          </IconSelect>
        </Field>
        <Field label="Tags" span={2}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['demo-requested','high-intent','enterprise','referral','event'].map(t => (
              <button key={t} className="chip">+ {t}</button>
            ))}
          </div>
        </Field>
      </div>
    </Modal>
  );
}

/* =========================================================
   NEW EVENT MODAL
   ========================================================= */
function NewEventModal({ open, onClose, onCreate }) {
  const [data, setData] = useM({ title: '', date: '', start: '10:00', end: '10:30', attendees: '', location: 'Google Meet' });
  useME(() => { if (open) setData({ title: '', date: '', start: '10:00', end: '10:30', attendees: '', location: 'Google Meet' }); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="New event"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { onCreate?.(data); onClose(); }} disabled={!data.title}>Create event</button>
      </>}
    >
      <div className="modal-grid">
        <Field label="Title" required span={2}>
          <IconInput icon="calendar" placeholder="Quarterly review" value={data.title} onChange={(e) => setData(d => ({ ...d, title: e.target.value }))} autoFocus/>
        </Field>
        <Field label="Date" required>
          <IconInput icon="calendar" type="date" value={data.date} onChange={(e) => setData(d => ({ ...d, date: e.target.value }))}/>
        </Field>
        <Field label="Location">
          <IconSelect icon="globe" value={data.location} onChange={(e) => setData(d => ({ ...d, location: e.target.value }))}>
            <option>Google Meet</option><option>Zoom</option><option>In-person</option><option>Phone</option>
          </IconSelect>
        </Field>
        <Field label="Start time">
          <IconInput icon="refresh" type="time" value={data.start} onChange={(e) => setData(d => ({ ...d, start: e.target.value }))}/>
        </Field>
        <Field label="End time">
          <IconInput icon="refresh" type="time" value={data.end} onChange={(e) => setData(d => ({ ...d, end: e.target.value }))}/>
        </Field>
        <Field label="Attendees" hint="Comma-separated emails" span={2}>
          <IconInput icon="users" placeholder="alice@acme.com, bob@example.com" value={data.attendees} onChange={(e) => setData(d => ({ ...d, attendees: e.target.value }))}/>
        </Field>
      </div>
    </Modal>
  );
}

/* =========================================================
   NEW AUTOMATION MODAL — multi-step
   ========================================================= */
const TRIGGERS = [
  { id: 'signup', label: 'Signup created', desc: 'When a new user signs up' },
  { id: 'pricing-page', label: 'Pricing page visit', desc: 'Visitor lands on /pricing' },
  { id: 'usage-drop', label: 'Usage drop > 30%', desc: 'Account activity falls sharply' },
  { id: 'deal-stage', label: 'Deal stage change', desc: 'A deal moves between stages' },
  { id: 'no-activity', label: 'No activity 14d', desc: 'Deal has been silent' },
  { id: 'trial-end', label: 'Trial ends in 3d', desc: 'Trial is about to expire' },
];
const ACTIONS = [
  { id: 'email', label: 'Send email', icon: 'mail' },
  { id: 'task', label: 'Create task', icon: 'check' },
  { id: 'slack', label: 'Slack notify', icon: 'chat' },
  { id: 'assign', label: 'Assign owner', icon: 'user' },
  { id: 'webhook', label: 'Webhook', icon: 'panel' },
];

function NewAutomationModal({ open, onClose, onCreate }) {
  const [step, setStep] = useM(0);
  const [data, setData] = useM({ name: '', trigger: '', actions: [] });
  useME(() => { if (open) { setStep(0); setData({ name: '', trigger: '', actions: [] }); } }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="New automation" subtitle="Build a workflow — name it, set a trigger, add actions." size="lg"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        {step > 0 && <button className="btn" onClick={() => setStep(s => s - 1)}>Back</button>}
        {step < 2 ? (
          <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={(step === 0 && !data.name) || (step === 1 && !data.trigger)}>Continue</button>
        ) : (
          <button className="btn btn-primary" onClick={() => { onCreate?.(data); onClose(); }} disabled={data.actions.length === 0}>Create automation</button>
        )}
      </>}
    >
      <div className="modal-stepper">
        {['Name','Trigger','Actions'].map((s, i) => (
          <div key={s} className={"modal-step" + (i === step ? ' current' : '') + (i < step ? ' done' : '')}>
            <div className="modal-step-circle">{i < step ? <Icon name="check" size={12}/> : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="modal-grid">
          <Field label="Automation name" required span={2}>
            <IconInput icon="automations" placeholder="e.g. New trial → onboarding" value={data.name} onChange={(e) => setData(d => ({ ...d, name: e.target.value }))} autoFocus/>
          </Field>
          <Field label="Description" span={2}>
            <div className="icon-input icon-input-textarea">
              <Icon name="edit" size={14} className="icon-input-ic"/>
              <textarea className="search" placeholder="What does this automation do? (optional)" rows={3} style={{ minHeight: 70, resize: 'vertical' }}/>
            </div>
          </Field>
        </div>
      )}

      {step === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {TRIGGERS.map(t => (
            <button key={t.id} className={"pick-card" + (data.trigger === t.id ? ' selected' : '')} onClick={() => setData(d => ({ ...d, trigger: t.id }))}>
              <div className="pick-card-h">{t.label}</div>
              <div className="pick-card-d">{t.desc}</div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10 }}>Click actions to add them to the workflow. They'll run in order.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 18 }}>
            {ACTIONS.map(a => (
              <button key={a.id} className="action-pick" onClick={() => setData(d => ({ ...d, actions: [...d.actions, a] }))}>
                <Icon name={a.icon} size={16}/>
                <span style={{ fontSize: 11.5, marginTop: 6 }}>{a.label}</span>
              </button>
            ))}
          </div>
          {data.actions.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 10, color: 'var(--text-muted)', fontSize: 13 }}>
              No actions yet — pick one above.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {data.actions.map((a, i) => (
                <div key={i} className="action-step">
                  <span className="action-step-num">{i + 1}</span>
                  <Icon name={a.icon} size={14}/>
                  <span style={{ fontSize: 13, flex: 1 }}>{a.label}</span>
                  <button className="icon-btn" style={{ width: 24, height: 24 }} onClick={() => setData(d => ({ ...d, actions: d.actions.filter((_, j) => j !== i) }))}><Icon name="close" size={11}/></button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

/* =========================================================
   COMPOSE MESSAGE MODAL
   ========================================================= */
function ComposeModal({ open, onClose, onSend }) {
  const [data, setData] = useM({ to: '', subject: '', body: '' });
  useME(() => { if (open) setData({ to: '', subject: '', body: '' }); }, [open]);
  return (
    <Modal open={open} onClose={onClose} title="Compose message" size="lg"
      footer={<>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          <button className="icon-btn" title="Attach"><Icon name="paperclip" size={15}/></button>
          <button className="icon-btn" title="Insert image"><Icon name="image" size={15}/></button>
          <button className="icon-btn" title="AI assist"><Icon name="sparkles" size={15}/></button>
        </div>
        <button className="btn" onClick={onClose}>Save draft</button>
        <button className="btn btn-primary" onClick={() => { onSend?.(data); onClose(); }} disabled={!data.to || !data.subject}>Send</button>
      </>}
    >
      <div className="modal-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
          <Icon name="user" size={14} style={{ color: 'var(--text-muted)' }}/>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 40 }}>To</span>
          <input className="search" style={{ flex: 1, border: 'none', padding: '6px 0', background: 'transparent' }} placeholder="recipient@example.com" value={data.to} onChange={(e) => setData(d => ({ ...d, to: e.target.value }))} autoFocus/>
          <button className="chip" style={{ padding: '2px 8px', fontSize: 11 }}>Cc</button>
          <button className="chip" style={{ padding: '2px 8px', fontSize: 11 }}>Bcc</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
          <Icon name="tag" size={14} style={{ color: 'var(--text-muted)' }}/>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 40 }}>Subject</span>
          <input className="search" style={{ flex: 1, border: 'none', padding: '6px 0', background: 'transparent' }} placeholder="Subject line" value={data.subject} onChange={(e) => setData(d => ({ ...d, subject: e.target.value }))}/>
        </div>
        <textarea className="search" placeholder="Write your message…" style={{ minHeight: 260, border: 'none', padding: '8px 0', background: 'transparent', resize: 'vertical' }} value={data.body} onChange={(e) => setData(d => ({ ...d, body: e.target.value }))}/>
      </div>
    </Modal>
  );
}

/* =========================================================
   CONFIRM DIALOG
   ========================================================= */
function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', destructive = false }) {
  return (
    <Modal open={open} onClose={onClose} size="sm"
      title={title}
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className={"btn " + (destructive ? "btn-destructive" : "btn-primary")} onClick={() => { onConfirm?.(); onClose(); }}>{confirmLabel}</button>
      </>}
    >
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-dim)', lineHeight: 1.55 }}>{message}</p>
    </Modal>
  );
}

window.Modal = Modal;
window.Field = Field;
window.NewDealModal = NewDealModal;
window.NewContactModal = NewContactModal;
window.NewEventModal = NewEventModal;
window.NewAutomationModal = NewAutomationModal;
window.ComposeModal = ComposeModal;
window.ConfirmDialog = ConfirmDialog;

import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Field, IconInput, IconSelect } from './Field';
import type { Customer } from '@/types';

interface NewContactData {
  name: string;
  email: string;
  company: string;
  plan: 'Pro' | 'Scale' | 'Enterprise';
  status: 'lead' | 'trial' | 'active';
  owner: string;
}

interface NewContactModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: Partial<Customer>) => void;
}

const DEFAULT: NewContactData = { name: '', email: '', company: '', plan: 'Pro', status: 'lead', owner: 'MO' };

const TAGS = ['demo-requested', 'high-intent', 'enterprise', 'referral', 'event'];

export function NewContactModal({ open, onClose, onCreate }: NewContactModalProps) {
  const [data, setData] = useState<NewContactData>(DEFAULT);

  useEffect(() => { if (open) setData(DEFAULT); }, [open]);

  const set = (patch: Partial<NewContactData>) => setData(d => ({ ...d, ...patch }));
  const canSubmit = !!data.name && !!data.email;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New contact"
      subtitle="Add a customer or lead to your CRM"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn" onClick={() => { onCreate?.(data); onClose(); }} disabled={!canSubmit}>Add &amp; create another</button>
        <button className="btn btn-primary" onClick={() => { onCreate?.(data); onClose(); }} disabled={!canSubmit}>Add contact</button>
      </>}
    >
      <div className="modal-grid">
        <Field label="Full name" required>
          <IconInput icon="user" placeholder="Jane Doe" value={data.name} onChange={(e) => set({ name: e.target.value })} autoFocus/>
        </Field>
        <Field label="Email" required>
          <IconInput icon="mail" type="email" placeholder="jane@acme.com" value={data.email} onChange={(e) => set({ email: e.target.value })}/>
        </Field>
        <Field label="Company">
          <IconInput icon="panel" placeholder="Acme Inc." value={data.company} onChange={(e) => set({ company: e.target.value })}/>
        </Field>
        <Field label="Plan">
          <IconSelect icon="tag" value={data.plan} onChange={(e) => set({ plan: e.target.value as NewContactData['plan'] })}>
            <option>Pro</option><option>Scale</option><option>Enterprise</option>
          </IconSelect>
        </Field>
        <Field label="Status">
          <IconSelect icon="check" value={data.status} onChange={(e) => set({ status: e.target.value as NewContactData['status'] })}>
            <option value="lead">Lead</option>
            <option value="trial">Trial</option>
            <option value="active">Active</option>
          </IconSelect>
        </Field>
        <Field label="Owner">
          <IconSelect icon="user" value={data.owner} onChange={(e) => set({ owner: e.target.value })}>
            <option value="MO">Mira Okafor</option>
            <option value="AR">Amelia Rouse</option>
            <option value="SK">Sun-Ho Kim</option>
            <option value="DV">Devin Vega</option>
          </IconSelect>
        </Field>
        <Field label="Tags" span={2}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TAGS.map(t => (
              <button key={t} className="chip">+ {t}</button>
            ))}
          </div>
        </Field>
      </div>
    </Modal>
  );
}

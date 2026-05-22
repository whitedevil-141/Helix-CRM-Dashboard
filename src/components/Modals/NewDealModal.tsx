import { useState, useEffect } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { Modal } from './Modal';
import { Field, IconInput, IconSelect } from './Field';
import type { Deal } from '@/types';

interface NewDealData {
  name: string;
  company: string;
  value: string;
  stage: string;
  owner: string;
  closeDate: string;
  tag: string;
}

interface NewDealModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (deal: Deal & { stage: string }) => void;
}

const DEFAULT: NewDealData = { name: '', company: '', value: '', stage: 'lead', owner: 'MO', closeDate: '', tag: 'warm' };

export function NewDealModal({ open, onClose, onCreate }: NewDealModalProps) {
  const [data, setData] = useState<NewDealData>(DEFAULT);

  useEffect(() => { if (open) setData(DEFAULT); }, [open]);

  const set = (patch: Partial<NewDealData>) => setData(d => ({ ...d, ...patch }));

  const submit = () => {
    if (!data.name || !data.company) return;
    const deal: Deal & { stage: string } = {
      id: 'd' + Date.now(),
      name: data.name,
      co: data.company,
      value: Number(data.value) || 0,
      tag: (data.tag as Deal['tag']) || 'warm',
      members: [data.owner],
      progress: 18,
      stage: data.stage,
    };
    onCreate?.(deal);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New deal"
      subtitle="Add a deal to your pipeline"
      size="md"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={submit} disabled={!data.name || !data.company}>Create deal</button>
      </>}
    >
      <div className="modal-grid">
        <Field label="Deal name" required span={2}>
          <IconInput icon="deals" placeholder="e.g. Annual contract renewal" value={data.name} onChange={(e) => set({ name: e.target.value })} autoFocus/>
        </Field>
        <Field label="Company" required>
          <IconInput icon="panel" placeholder="Acme Inc." value={data.company} onChange={(e) => set({ company: e.target.value })}/>
        </Field>
        <Field label="Value">
          <div className="icon-input">
            <Icon name="money" size={14} className="icon-input-ic"/>
            <input className="search" type="number" placeholder="50,000" value={data.value} onChange={(e) => set({ value: e.target.value })} style={{ fontFamily: 'var(--mono)' }}/>
          </div>
        </Field>
        <Field label="Stage">
          <IconSelect icon="pipeline" value={data.stage} onChange={(e) => set({ stage: e.target.value })}>
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed">Closed Won</option>
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
        <Field label="Expected close">
          <IconInput icon="calendar" type="date" value={data.closeDate} onChange={(e) => set({ closeDate: e.target.value })}/>
        </Field>
        <Field label="Temperature">
          <div className="seg" style={{ width: '100%' }}>
            {['cold', 'warm', 'hot'].map(t => (
              <button key={t} className={data.tag === t ? 'on' : ''} onClick={() => set({ tag: t })} style={{ flex: 1, textTransform: 'capitalize' }}>{t}</button>
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

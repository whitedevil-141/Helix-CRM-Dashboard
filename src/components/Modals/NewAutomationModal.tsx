import { useState, useEffect } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { Modal } from './Modal';
import { Field, IconInput } from './Field';
import type { IconName } from '@/types';

interface AutomationData {
  name: string;
  trigger: string;
  actions: { id: string; label: string; icon: IconName }[];
}

interface NewAutomationModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: AutomationData) => void;
}

const TRIGGERS = [
  { id: 'signup', label: 'Signup created', desc: 'When a new user signs up' },
  { id: 'pricing-page', label: 'Pricing page visit', desc: 'Visitor lands on /pricing' },
  { id: 'usage-drop', label: 'Usage drop > 30%', desc: 'Account activity falls sharply' },
  { id: 'deal-stage', label: 'Deal stage change', desc: 'A deal moves between stages' },
  { id: 'no-activity', label: 'No activity 14d', desc: 'Deal has been silent' },
  { id: 'trial-end', label: 'Trial ends in 3d', desc: 'Trial is about to expire' },
];

const ACTIONS: { id: string; label: string; icon: IconName }[] = [
  { id: 'email', label: 'Send email', icon: 'mail' },
  { id: 'task', label: 'Create task', icon: 'check' },
  { id: 'slack', label: 'Slack notify', icon: 'chat' },
  { id: 'assign', label: 'Assign owner', icon: 'user' },
  { id: 'webhook', label: 'Webhook', icon: 'panel' },
];

const DEFAULT: AutomationData = { name: '', trigger: '', actions: [] };
const STEPS = ['Name', 'Trigger', 'Actions'];

export function NewAutomationModal({ open, onClose, onCreate }: NewAutomationModalProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AutomationData>(DEFAULT);

  useEffect(() => { if (open) { setStep(0); setData(DEFAULT); } }, [open]);

  const set = (patch: Partial<AutomationData>) => setData(d => ({ ...d, ...patch }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New automation"
      subtitle="Build a workflow — name it, set a trigger, add actions."
      size="lg"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        {step > 0 && <button className="btn" onClick={() => setStep(s => s - 1)}>Back</button>}
        {step < 2 ? (
          <button
            className="btn btn-primary"
            onClick={() => setStep(s => s + 1)}
            disabled={(step === 0 && !data.name) || (step === 1 && !data.trigger)}
          >Continue</button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => { onCreate?.(data); onClose(); }}
            disabled={data.actions.length === 0}
          >Create automation</button>
        )}
      </>}
    >
      <div className="modal-stepper">
        {STEPS.map((s, i) => (
          <div key={s} className={'modal-step' + (i === step ? ' current' : '') + (i < step ? ' done' : '')}>
            <div className="modal-step-circle">{i < step ? <Icon name="check" size={12}/> : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="modal-grid">
          <Field label="Automation name" required span={2}>
            <IconInput icon="automations" placeholder="e.g. New trial → onboarding" value={data.name} onChange={(e) => set({ name: e.target.value })} autoFocus/>
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
            <button
              key={t.id}
              className={'pick-card' + (data.trigger === t.id ? ' selected' : '')}
              onClick={() => set({ trigger: t.id })}
            >
              <div className="pick-card-h">{t.label}</div>
              <div className="pick-card-d">{t.desc}</div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 10 }}>
            Click actions to add them to the workflow. They'll run in order.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 18 }}>
            {ACTIONS.map(a => (
              <button key={a.id} className="action-pick" onClick={() => set({ actions: [...data.actions, a] })}>
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
                  <button
                    className="icon-btn"
                    style={{ width: 24, height: 24 }}
                    onClick={() => set({ actions: data.actions.filter((_, j) => j !== i) })}
                  >
                    <Icon name="close" size={11}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

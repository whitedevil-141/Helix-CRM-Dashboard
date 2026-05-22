import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Field, IconInput, IconSelect } from './Field';

interface NewEventData {
  title: string;
  date: string;
  start: string;
  end: string;
  attendees: string;
  location: string;
}

interface NewEventModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (data: NewEventData) => void;
}

const DEFAULT: NewEventData = { title: '', date: '', start: '10:00', end: '10:30', attendees: '', location: 'Google Meet' };

export function NewEventModal({ open, onClose, onCreate }: NewEventModalProps) {
  const [data, setData] = useState<NewEventData>(DEFAULT);

  useEffect(() => { if (open) setData(DEFAULT); }, [open]);

  const set = (patch: Partial<NewEventData>) => setData(d => ({ ...d, ...patch }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New event"
      footer={<>
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { onCreate?.(data); onClose(); }} disabled={!data.title}>Create event</button>
      </>}
    >
      <div className="modal-grid">
        <Field label="Title" required span={2}>
          <IconInput icon="calendar" placeholder="Quarterly review" value={data.title} onChange={(e) => set({ title: e.target.value })} autoFocus/>
        </Field>
        <Field label="Date" required>
          <IconInput icon="calendar" type="date" value={data.date} onChange={(e) => set({ date: e.target.value })}/>
        </Field>
        <Field label="Location">
          <IconSelect icon="globe" value={data.location} onChange={(e) => set({ location: e.target.value })}>
            <option>Google Meet</option><option>Zoom</option><option>In-person</option><option>Phone</option>
          </IconSelect>
        </Field>
        <Field label="Start time">
          <IconInput icon="refresh" type="time" value={data.start} onChange={(e) => set({ start: e.target.value })}/>
        </Field>
        <Field label="End time">
          <IconInput icon="refresh" type="time" value={data.end} onChange={(e) => set({ end: e.target.value })}/>
        </Field>
        <Field label="Attendees" hint="Comma-separated emails" span={2}>
          <IconInput icon="users" placeholder="alice@acme.com, bob@example.com" value={data.attendees} onChange={(e) => set({ attendees: e.target.value })}/>
        </Field>
      </div>
    </Modal>
  );
}
